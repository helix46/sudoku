import { Injectable } from '@angular/core';
import { StructCell } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  getColumnOfCells = (cells: StructCell[][], column: number): StructCell[] => {
    const ColumnOfCells: StructCell[] = [];
    this.getArray().forEach((row) => {
      ColumnOfCells.push(cells[row][column]);
    });
    return ColumnOfCells;
  };

  getBlockStartRow = (block: number): number => {
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

  getBlockStartColumn = (block: number): number => {
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

  getBlockOfCells = (cells: StructCell[][], block: number): StructCell[] => {
    const startRow = this.getBlockStartRow(block);
    const startCol = this.getBlockStartColumn(block);

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

  getArray = (start: number = 0) => {
    const array = new Array(9).fill(start);
    return array.map((_, i) => i + start);
  };

  constructor() {}
}
