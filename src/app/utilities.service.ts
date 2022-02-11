import { Injectable } from '@angular/core';
import { StructCell } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  getColumnOfCells = (cells: StructCell[][], column: number): StructCell[] => {
    const ColumnOfCells: StructCell[] = [];
    for (let row = 0; row < 9; row++) {
      ColumnOfCells.push(cells[row][column]);
    }
    return ColumnOfCells;
  };

  getBlockOfCells = (cells: StructCell[][], block: number): StructCell[] => {
    let startRow = 0;
    let startCol = 0;
    switch (block) {
      case 0:
      case 1:
      case 2:
        startRow = 0;
        break;
      case 3:
      case 4:
      case 5:
        startRow = 1;
        break;
      case 6:
      case 7:
      case 8:
        startRow = 2;
        break;
    }
    switch (block) {
      case 0:
      case 3:
      case 6:
        startCol = 0;
        break;
      case 1:
      case 4:
      case 7:
        startCol = 3;
        break;
      case 2:
      case 5:
      case 8:
        startCol = 6;
        break;
    }
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

  constructor() {}
}
