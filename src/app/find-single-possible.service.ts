import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class FindSinglePossibleService {
  findSinglePossible = (cells: StructCell[][]) => {
    //find number in row / col / block that is only possible in one cell
    this.findSinglePossibleInRow(cells);
    // this.findSinglePossibleInColumn(cells);
    // this.findSinglePossibleInBlock(cells);
  };

  findSinglePossibleInRow = (cells: StructCell[][]) => {
    for (let row = 0; row < 9; row++) {
      this.setSinglePossibleInNineCells(cells[row]);
    }
  };

  findSinglePossibleInColumn = (cells: StructCell[][]) => {
    for (let column = 0; column < 9; column++) {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      this.setSinglePossibleInNineCells(arrayOfCells);
    }
  };

  findSinglePossibleInBlock = (cells: StructCell[][]) => {
    for (let block = 0; block < 9; block++) {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(cells, block);
      this.setSinglePossibleInNineCells(arrayOfCells);
    }
  };

  setSinglePossibleInNineCells = (cells: StructCell[]) => {
    // go through numbers 1 - 9
    for (let num = 1; num < 10; num++) {
      let found = false;
      let duplicateFound = false;
      let cellFoundin = 0;
      for (let cell = 0; cell < 9; cell++) {
        if (!cells[cell].large) {
          cells[cell].possibles.forEach((possible) => {
            if (possible === num) {
              if (found) {
                duplicateFound = true;
              } else {
                found = true;
                cellFoundin = cell;
              }
            }
          });
        }
      }
      // if number only found in the possibles of one cell, then set the possibles to this number
      if (found && !duplicateFound) {
        if (!cells[cellFoundin].large) {
          cells[cellFoundin].possibles = [num];
        }
      }
    }
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
