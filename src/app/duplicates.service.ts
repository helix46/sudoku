import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { digitType, indexType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class DuplicatesService {
  digitExistsInRow = (
    digit: digitType,
    rowIndex: indexType,
    cells: StructCell[][],
    cellToExclude: StructCell
  ): boolean => {
    let duplicateFound = false;
    this.utilitiesService.getIndexArray().forEach((columnIndex) => {
      const temp = cells[rowIndex][columnIndex];
      if (
        temp.digit === digit &&
        temp.columnIndex !== cellToExclude.columnIndex
      ) {
        duplicateFound = true;
      }
    });
    return duplicateFound;
  };

  digitExistsInColumn = (
    digit: digitType,
    columnIndex: indexType,
    cells: StructCell[][],
    cellToExclude: StructCell
  ): boolean => {
    let found = false;
    this.utilitiesService.getIndexArray().forEach((rowIndex) => {
      const temp = cells[rowIndex][columnIndex];
      if (temp.digit === digit && temp.rowIndex !== cellToExclude.rowIndex) {
        found = true;
      }
    });
    return found;
  };

  checkForDuplicate = (cell: StructCell, cells: StructCell[][]): boolean => {
    if (cell.digit === '') {
      return false;
    }

    if (this.digitExistsInRow(cell.digit, cell.rowIndex, cells, cell)) {
      return true;
    }

    if (this.digitExistsInColumn(cell.digit, cell.columnIndex, cells, cell)) {
      return true;
    }

    const blockIndex: indexType =
      this.utilitiesService.getBlockIndexFromCell(cell);
    return this.digitExistsInBlock(cell.digit, blockIndex, cells, cell);
  };

  digitExistsInBlock = (
    digit: digitType,
    blockIndex: indexType,
    cells: StructCell[][],
    cellToExclude: StructCell
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
