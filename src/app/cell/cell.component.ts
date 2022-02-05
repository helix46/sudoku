import { Component, Input, OnInit, Type } from '@angular/core';
import { StructCell } from '../app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { ChoiceComponent } from '../choice/choice.component';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}
  @Input() structCell!: StructCell;

  leftClicked = () => {
    this.structCell.isLarge = true;
    this.openChoice();
  };

  rightClicked = () => {
    this.structCell.isLarge = false;
    this.openChoice();
    return false;
  };

  openChoice = () => {
    this.matDialog
      .open(
        ModalContainerComponent,
        this.getMatDialogConfig(
          this.structCell,
          ChoiceComponent,
          '230px',
          false
        )
      )
      .afterClosed()
      .subscribe((structCell: StructCell) => {
        if (structCell) {
          this.structCell = structCell;
        }
      });
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
