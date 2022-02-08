import { Injectable } from '@angular/core';
import { StructCell } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseRow = (row: number): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    for (let column = 0; column < 10; column++) {
      const structCell: StructCell = {
        given: false,
        column,
        row,
        large: null,
        isLarge: true,
        smalls: [],
        focussed: false,
        error: false,
      };
      rowOfCells.push(structCell);
    }
    return rowOfCells;
  };

  checkRowForDuplicates = (
    row: number,
    structCell: StructCell,
    cells: StructCell[][]
  ) => {
    for (let column = 0; column < 10; column++) {
      const temp = cells[row][column];
      if (
        structCell.large &&
        temp.large === structCell.large &&
        temp.column !== structCell.column
      ) {
        structCell.error = true;
      }
    }
  };

  checkColumnForDuplicates = (
    column: number,
    structCell: StructCell,
    cells: StructCell[][]
  ) => {
    for (let row = 0; row < 10; row++) {
      if (
        structCell.large &&
        cells[row][column].large === structCell.large &&
        cells[row][column].row !== structCell.row
      ) {
        structCell.error = true;
      }
    }
  };

  checkForErrors = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        this.checkForDuplicate(cells[row][column], cells);
      }
    }
  };

  initialiseCells = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      const columns: StructCell[] = this.initialiseRow(row);
      cells.push(columns);
    }
  };

  checkForDuplicate = (structCell: StructCell, cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      this.checkRowForDuplicates(row, structCell, cells);
    }
    for (let column = 0; column < 10; column++) {
      this.checkColumnForDuplicates(column, structCell, cells);
    }
  };

  constructor() {}
}
