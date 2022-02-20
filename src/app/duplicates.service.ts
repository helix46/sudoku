import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import {
  candidateType,
  digitType,
  indexType,
  rowType,
  StructCell,
} from './definitions';

@Injectable({
  providedIn: 'root',
})
export class DuplicatesService {
  checkRowForDuplicates = (
    cell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    let duplicateFound = false;
    this.utilitiesService.getIndexArray().forEach((columnIndex) => {
      const temp = cells[cell.rowID][columnIndex];
      if (temp.digit === pDigit && temp.columnID !== pColumnIndex) {
        duplicateFound = true;
      }
    });
    return duplicateFound;
  };

  checkColumnForDuplicates = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    cells: StructCell[][]
  ): boolean => {
    let found = false;
    this.utilitiesService.getArray().forEach((row) => {
      const temp = cells[row][pColumn];
      if (temp.large === plarge && temp.row !== pRow) {
        found = true;
      }
    });
    return found;
  };

  checkForDuplicate = (cell: StructCell, cells: StructCell[][]): boolean => {
    if (cell.digit === '') {
      return false;
    }

    if (this.checkRowForDuplicates(cell, cells)) {
      return true;
    }

    if (this.checkColumnForDuplicates(digit, rowIndex, columnIndex, cells)) {
      return true;
    }

    return this.blockContainsDuplicate(digit, rowIndex, columnIndex, cells);
  };

  blockContainsDuplicate = (
    pDigit: digitType,
    pRowIndex: indexType,
    pColumnIndex: indexType,
    cells: StructCell[][]
  ): boolean => {
    const startRowOfBlock = this.utilitiesService.getStartOfBlock(pRowIndex);
    const startColumnOfBlock =
      this.utilitiesService.getStartOfBlock(pColumnIndex);
    for (let row = startRowOfBlock; row < startRowOfBlock + 3; row++) {
      for (
        let column = startColumnOfBlock;
        column < startColumnOfBlock + 3;
        column++
      ) {
        if (
          cells[row][column].large === pDigit &&
          cells[row][column].row !== pRowIndex &&
          cells[row][column].column !== pColumnIndex
        ) {
          return true;
        }
      }
    }
    return false;
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
