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
  constructor(private matDialog: MatDialog) {}
  @Input() structCell!: StructCell;
  @Input() cellsEnteredAreGiven = false;
  @Output() focussed: EventEmitter<void> = new EventEmitter();

  leftClicked = () => {
    this.focussed.emit();
    this.structCell.isLarge = true;
    this.openChoice(true);
    this.structCell.focussed = true;
  };

  rightClicked = () => {
    if (!this.cellsEnteredAreGiven && !this.structCell.given) {
      this.focussed.emit();
      this.structCell.isLarge = false;
      this.openChoice(false);
      this.structCell.focussed = true;
    }
    return false;
  };

  openChoice = (isLarge: boolean) => {
    const structCellModal: StructCellModal = {
      structCell: this.structCell,
      isLarge,
    };
    this.matDialog
      .open(
        ModalContainerComponent,
        this.getMatDialogConfig(
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

  displaySmalls = (): string => {
    let s = '';
    this.structCell.smalls.forEach((n) => {
      s += n.toString();
    });
    return s;
  };

  getMatDialogConfig = <T, U>(
    data: U,
    component: Type<T>,
    // component: Type<Component>,
    width: string,
    disableClose: boolean,
    panelClass?: string
  ): MatDialogConfig => {
    const matDialogConfig: MatDialogConfig = {
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
