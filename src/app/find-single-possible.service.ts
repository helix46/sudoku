import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class FindSinglePossibleService {
  findSinglePossible = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    //find number in row / col / block that is only possible in one cell
    if (this.findSinglePossibleInRow(cells)) {
      changeMade = true;
    }
    if (this.findSinglePossibleInColumn(cells)) {
      changeMade = true;
    }
    if (this.findSinglePossibleInBlock(cells)) {
      changeMade = true;
    }
    return changeMade;
  };

  findSinglePossibleInRow = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((row) => {
      if (this.setSinglePossibleInNineCells(cells[row])) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSinglePossibleInColumn = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((column) => {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      if (this.setSinglePossibleInNineCells(arrayOfCells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSinglePossibleInBlock = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((block) => {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(cells, block);
      if (this.setSinglePossibleInNineCells(arrayOfCells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  setSinglePossibleInNineCells = (cells: StructCell[]): boolean => {
    let changeMade = false;
    // go through numbers 1 - 9
    this.utilitiesService.getArray(1).forEach((num) => {
      let found = false;
      let duplicateFound = false;
      let indexFoundin = 0;
      this.utilitiesService.getArray().forEach((index) => {
        if (!cells[index].large) {
          cells[index].possibles.forEach((possible) => {
            if (possible === num) {
              if (found) {
                duplicateFound = true;
              } else {
                found = true;
                indexFoundin = index;
              }
            }
          });
        }
      });
      // if number only found in the possibles of one cell, then set the possibles to this number
      if (found && !duplicateFound) {
        if (!cells[indexFoundin].large) {
          if (
            !this.utilitiesService.arrayEquals(cells[indexFoundin].possibles, [
              num,
            ])
          ) {
            changeMade = true;
          }
          cells[indexFoundin].possibles = [num];
        }
      }
    });
    return changeMade;
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
