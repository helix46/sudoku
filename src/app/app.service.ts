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
    structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    for (let column = 0; column < 10; column++) {
      const temp = cells[structCell.row][column];
      if (
        temp.large === structCell.large &&
        temp.column !== structCell.column
      ) {
        return true;
      }
    }
    return false;
  };

  checkColumnForDuplicates = (
    structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    for (let row = 0; row < 10; row++) {
      const temp = cells[row][structCell.column];
      if (temp.large === structCell.large && temp.row !== structCell.row) {
        return true;
      }
    }
    return false;
  };

  checkForErrors = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        cells[row][column].error = this.checkForDuplicate(
          cells[row][column],
          cells
        );
      }
    }
  };

  initialiseCells = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      const columns: StructCell[] = this.initialiseRow(row);
      cells.push(columns);
    }
  };

  checkForDuplicate = (
    structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    if (!structCell.large) {
      return false;
    }

    if (this.checkRowForDuplicates(structCell, cells)) {
      return true;
    }

    if (this.checkColumnForDuplicates(structCell, cells)) {
      return true;
    }

    return this.blockContainsDuplicate(structCell, cells);
  };

  blockContainsDuplicate = (
    structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    const startRowOfBlock = this.getStart(structCell.row);
    const startColumnOfBlock = this.getStart(structCell.column);
    for (let row = startRowOfBlock; row < startRowOfBlock + 3; row++) {
      for (
        let column = startColumnOfBlock;
        column < startColumnOfBlock + 3;
        column++
      ) {
        if (
          cells[row][column].large === structCell.large &&
          cells[row][column].row !== structCell.row &&
          cells[row][column].column !== structCell.column
        ) {
          return true;
        }
      }
    }
    return false;
  };

  getStart = (start: number): number => {
    switch (start) {
      case 0:
      case 1:
      case 2:
        return 0;
      case 3:
      case 4:
      case 5:
        return 3;
      case 6:
      case 7:
      case 8:
        return 6;
    }
    return 0;
  };

  constructor() {}
}
