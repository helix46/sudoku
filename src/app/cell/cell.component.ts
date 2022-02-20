import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
} from '@angular/core';
import { StructCell } from '../app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { ChoiceComponent } from '../choice/choice.component';
import { AppService } from '../app.service';

export interface StructCellModal {
  structCell: StructCell;
  isLarge: boolean;
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  constructor(private matDialog: MatDialog, private appService: AppService) {}
  @Input() cells!: StructCell[][];
  @Input() structCell!: StructCell;
  @Input() cellsEnteredAreGiven = false;
  @Output() focussed: EventEmitter<void> = new EventEmitter();

  leftClicked = () => {
    this.focussed.emit();
    //this.openChoice(this.cells);
    this.openChoice(true, this.cells);
    this.structCell.focussed = true;
  };

  rightClicked = () => {
    if (
      !this.cellsEnteredAreGiven &&
      !this.structCell.given &&
      !this.structCell.large
    ) {
      this.focussed.emit();
      this.openChoice(false, this.cells);
      this.structCell.focussed = true;
    }
    return false;
  };

  // openChoice = (cells: StructCell[][]) => {
  openChoice = (isLarge: boolean, cells: StructCell[][]) => {
    const structCellModal: StructCellModal = {
      structCell: this.structCell,
      isLarge,
    };
    this.matDialog
      .open(
        ModalContainerComponent,
        this.getMatDialogConfig(
          //this.structCell,
          structCellModal,
          ChoiceComponent,
          '230px',
          false
        )
      )
      .afterClosed()
      .subscribe((structCell: StructCell) => {
        if (structCell) {
          this.structCell = structCell;
          if (this.cellsEnteredAreGiven) {
            this.structCell.given = true;
          }
        } else {
          if (isLarge) {
            this.structCell.large = null;
          }
        }
        this.appService.checkForErrors(cells);
        this.appService.processCells(cells);
      });
  };

  getBackground = (): string => {
    if (this.structCell.given) {
      if (this.structCell.focussed) {
        return 'steelblue';
      } else {
        return 'darkgray';
      }
    } else {
      if (this.structCell.focussed) {
        return 'lightblue';
      } else {
        return 'white';
      }
    }
  };

  displayCandidates = (): string => {
    let s = '';
    this.structCell.candidates.forEach((n) => {
      s += n.toString();
    });
    return s;
  };

  getMatDialogConfig = <T, U>(
    data: U,
    component: Type<T>,
    width: string,
    disableClose: boolean,
    panelClass?: string
  ): MatDialogConfig => {
    const matDialogConfig: MatDialogConfig = {
      position: { top: '0', left: '500px' },
      width,
      data: {
        data,
        component,
      },
      disableClose,
    };
    if (panelClass) {
      matDialogConfig.panelClass = panelClass;
    }
    return matDialogConfig;
  };

  ngOnInit(): void {}
}
