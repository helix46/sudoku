import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
} from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { ChoiceComponent } from '../choice/choice.component';
import { AppService } from '../app.service';
import { Cell } from './cell';

export interface StructCellModal {
  cell: Cell;
  isLarge: boolean;
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  constructor(private matDialog: MatDialog, private appService: AppService) {}
  @Input() allCells!: Cell[][];
  @Input() cell!: Cell;
  @Input() cellsEnteredAreGiven = false;
  @Output() focussed: EventEmitter<void> = new EventEmitter();

  leftClicked = () => {
    this.focussed.emit();
    this.openChoice(true);
    this.cell.focussed = true;
  };

  rightClicked = () => {
    if (!this.cellsEnteredAreGiven && !this.cell.given && !this.cell.digit) {
      this.focussed.emit();
      this.openChoice(false);
      this.cell.focussed = true;
    }
    return false;
  };

  openChoice = (isLarge: boolean) => {
    const structCellModal: StructCellModal = {
      cell: this.cell,
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
      .subscribe((cell: Cell) => {
        if (cell) {
          this.cell = cell;
          if (this.cellsEnteredAreGiven) {
            this.cell.given = true;
          }
        } else {
          if (isLarge) {
            this.cell.digit = '';
          }
        }
        this.appService.checkForErrors();
        this.appService.processCells(false);
      });
  };

  getBackground = (): string => {
    if (this.cell.given) {
      if (this.cell.focussed) {
        return 'steelblue';
      } else {
        return 'darkgray';
      }
    } else {
      if (this.cell.focussed) {
        return 'lightblue';
      } else {
        return 'white';
      }
    }
  };

  displayCandidates = (): string => {
    let s = '';
    this.cell.candidates.forEach((n) => {
      s += n;
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
