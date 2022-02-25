import { Injectable } from '@angular/core';
import {
  allCells,
  getColumnOfCells,
  getIndexArray,
  getRowOfCells,
} from './utilities.service';
import { digitType, indexType } from './definitions';
import { Cell } from './cell/cell';
import { Block } from './block';

@Injectable({
  providedIn: 'root',
})
export class DuplicatesService {
  digitExistInCellsRowColumnOrBlock = (
    digit: digitType,
    rowIndex: indexType,
    columnIndex: indexType
  ): boolean => {
    if (digit === '') {
      return false;
    }

    let house: Cell[];

    house = getRowOfCells(rowIndex);
    if (this.digitExistsInHouse(digit, house, rowIndex, columnIndex)) {
      return true;
    }

    house = getColumnOfCells(columnIndex);
    if (this.digitExistsInHouse(digit, house, rowIndex, columnIndex)) {
      return true;
    }

    const blockIndex: indexType = allCells[rowIndex][columnIndex].blockIndex;
    const block = new Block(blockIndex);
    return this.digitExistsInHouse(digit, block.cells, rowIndex, columnIndex);
  };

  digitExistsInHouse = (
    digit: digitType,
    house: Cell[],
    rowToExclude: indexType,
    columnToExclude: indexType
  ): boolean => {
    let digitFound = false;
    getIndexArray().forEach((index) => {
      const temp = house[index];
      if (
        temp.digit === digit &&
        !(
          temp.columnIndex === columnToExclude && temp.rowIndex === rowToExclude
        )
      ) {
        digitFound = true;
      }
    });
    return digitFound;
  };
  constructor() {}
}
