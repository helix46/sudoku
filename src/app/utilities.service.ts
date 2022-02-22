import { Injectable } from '@angular/core';
import {
  dimension,
  indexType,
  StructCell,
  digitType,
  StructBlock,
} from './definitions';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  getColumnOfCells = (
    cells: StructCell[][],
    columnIndex: indexType
  ): StructCell[] => {
    const ColumnOfCells: StructCell[] = [];
    this.getIndexArray().forEach((rowIndex) => {
      ColumnOfCells.push(cells[rowIndex][columnIndex]);
    });
    return ColumnOfCells;
  };

  getRowOfCells = (
    cells: StructCell[][],
    rowIndex: indexType
  ): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    this.getIndexArray().forEach((columnIndex) => {
      rowOfCells.push(cells[rowIndex][columnIndex]);
    });
    return rowOfCells;
  };

  getBlockStartRow = (block: indexType): indexType => {
    switch (block) {
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
    throw new Error('Start row not found in block: ' + block);
  };

  getBlockStartColumn = (block: indexType): indexType => {
    switch (block) {
      case 0:
      case 3:
      case 6:
        return 0;

      case 1:
      case 4:
      case 7:
        return 3;

      case 2:
      case 5:
      case 8:
        return 6;
    }
    throw new Error('Start column not found in block: ' + block);
  };

  getBlockOfCells = (
    blockIndex: indexType,
    cells: StructCell[][]
  ): StructCell[] => {
    const startRow = this.getBlockStartRow(blockIndex);
    const startCol = this.getBlockStartColumn(blockIndex);

    const returnArray: StructCell[] = [];
    returnArray.push(cells[startRow][startCol]);
    returnArray.push(cells[startRow][startCol + 1]);
    returnArray.push(cells[startRow][startCol + 2]);
    returnArray.push(cells[startRow + 1][startCol]);
    returnArray.push(cells[startRow + 1][startCol + 1]);
    returnArray.push(cells[startRow + 1][startCol + 2]);
    returnArray.push(cells[startRow + 2][startCol]);
    returnArray.push(cells[startRow + 2][startCol + 1]);
    returnArray.push(cells[startRow + 2][startCol + 2]);

    return returnArray;
  };

  logCell = (structCell: StructCell, comment: string) => {
    console.log(JSON.stringify(structCell), comment);
  };

  getIndexArray = (): indexType[] => {
    const array: indexType[] = new Array<indexType>(dimension);
    return array.map((_, index): indexType => {
      switch (index) {
        case 0:
          return 0;
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 3;
        case 4:
          return 4;
        case 5:
          return 5;
        case 6:
          return 6;
        case 7:
          return 7;
        case 8:
          return 8;
        default:
          return 1;
      }
    });
  };

  getDigitArray = (): digitType[] => {
    const array: digitType[] = new Array<digitType>(dimension);
    return array.map((_, index) => {
      switch (index) {
        case 0:
          return '1';
        case 1:
          return '2';
        case 2:
          return '3';
        case 3:
          return '4';
        case 4:
          return '5';
        case 5:
          return '6';
        case 6:
          return '7';
        case 7:
          return '8';
        case 8:
          return '9';
        default:
          return '1';
      }
    });
  };

  addNumberstoUniqueArray = (array: digitType[], numbersToAdd: digitType[]) => {
    numbersToAdd.forEach((num) => {
      const filteredArray = array.filter((arrayNum) => {
        return arrayNum === num;
      });
      // if number to add does not exist in array
      if (filteredArray.length === 0) {
        array.push(num);
      }
    });
  };

  getUniqueCandidatesForBlock = (
    cells: StructCell[][],
    blockIndex: indexType
  ): digitType[] => {
    const startRow = this.getBlockStartRow(blockIndex);
    const startCol = this.getBlockStartColumn(blockIndex);
    const UniqueCandidatesForBlock: digitType[] = [];
    for (let row = startRow; row < startRow + 3; row++) {
      // get unique candidates for this row of the block
      for (let column = startCol; column < startCol + 3; column++) {
        const structCell: StructCell = cells[row][column];
        this.addNumberstoUniqueArray(
          UniqueCandidatesForBlock,
          structCell.candidates
        );
      }
    }
    return UniqueCandidatesForBlock;
  };

  arrayEquals = <T>(pair: T[], candidates: T[]): boolean => {
    if (pair.length !== candidates.length) {
      return false;
    }

    let equals = true;
    pair.forEach((value, index) => {
      if (value !== candidates[index]) {
        equals = false;
      }
    });
    return equals;
  };

  getStartOfBlock = (start: indexType): indexType => {
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

  getBlockIndexFromCell = (
    rowIndex: indexType,
    columnIndex: indexType
  ): indexType => {
    if (rowIndex < 3) {
      if (columnIndex < 3) {
        return 0;
      }
      if (columnIndex < 6) {
        return 1;
      }
      return 2;
    }
    if (rowIndex < 6) {
      if (columnIndex < 3) {
        return 3;
      }
      if (columnIndex < 6) {
        return 4;
      }
      return 5;
    }
    if (columnIndex < 3) {
      return 6;
    }
    if (columnIndex < 6) {
      return 7;
    }
    return 8;
  };

  getBlock = (blockIndex: indexType, cells: StructCell[][]): StructBlock => {
    return {
      startRowIndex: this.getBlockStartRow(blockIndex),
      startColumnIndex: this.getBlockStartColumn(blockIndex),
      cells: this.getBlockOfCells(blockIndex, cells),
    };
  };

  constructor() {}
}
