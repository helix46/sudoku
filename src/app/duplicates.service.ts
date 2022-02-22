import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { digitType, indexType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class DuplicatesService {
  digitExistInCellsRowColumnOrBlock = (
    digit: digitType,
    rowIndex: indexType,
    columnIndex: indexType,
    cells: StructCell[][]
  ): boolean => {
    if (digit === '') {
      return false;
    }

    let house: StructCell[];

    house = this.utilitiesService.getRowOfCells(cells, rowIndex);
    if (this.digitExistsInHouse(digit, house, rowIndex, columnIndex)) {
      return true;
    }

    house = this.utilitiesService.getColumnOfCells(cells, columnIndex);
    if (this.digitExistsInHouse(digit, house, rowIndex, columnIndex)) {
      return true;
    }

    const blockIndex: indexType = this.utilitiesService.getBlockIndexFromCell(
      rowIndex,
      columnIndex
    );
    house = this.utilitiesService.getBlockOfCells(blockIndex, cells);
    return this.digitExistsInHouse(digit, house, rowIndex, columnIndex);
  };

  digitExistsInHouse = (
    digit: digitType,
    house: StructCell[],
    rowToExclude: indexType,
    columnToExclude: indexType
  ): boolean => {
    let digitFound = false;
    this.utilitiesService.getIndexArray().forEach((index) => {
      const temp = house[index];
      if (
        temp.digit === digit &&
        temp.columnIndex !== columnToExclude &&
        temp.rowIndex !== rowToExclude
      ) {
        digitFound = true;
      }
    });
    return digitFound;
  };
  constructor(private utilitiesService: UtilitiesService) {}
}
