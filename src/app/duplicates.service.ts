import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class DuplicatesService {
  checkRowForDuplicates = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    // structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    for (let column = 0; column < 9; column++) {
      const temp = cells[pRow][column];
      if (temp.large === plarge && temp.column !== pColumn) {
        return true;
      }
    }
    return false;
  };

  checkColumnForDuplicates = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    cells: StructCell[][]
  ): boolean => {
    for (let row = 0; row < 9; row++) {
      const temp = cells[row][pColumn];
      if (temp.large === plarge && temp.row !== pRow) {
        return true;
      }
    }
    return false;
  };

  checkForDuplicate = (
    large: number | null,
    row: number,
    column: number,
    cells: StructCell[][]
  ): boolean => {
    if (!large) {
      return false;
    }

    if (this.checkRowForDuplicates(large, row, column, cells)) {
      return true;
    }

    if (this.checkColumnForDuplicates(large, row, column, cells)) {
      return true;
    }

    return this.blockContainsDuplicate(large, row, column, cells);
  };

  blockContainsDuplicate = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    cells: StructCell[][]
  ): boolean => {
    const startRowOfBlock = this.getStart(pRow);
    const startColumnOfBlock = this.getStart(pColumn);
    for (let row = startRowOfBlock; row < startRowOfBlock + 3; row++) {
      for (
        let column = startColumnOfBlock;
        column < startColumnOfBlock + 3;
        column++
      ) {
        if (
          cells[row][column].large === plarge &&
          cells[row][column].row !== pRow &&
          cells[row][column].column !== pColumn
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
