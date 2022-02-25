import { Injectable } from '@angular/core';
import { getIndexArray, getRowOfCells } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class NakedSinglesService {
  checkForNakedSingles = (): boolean => {
    let changeMade = false;
    getIndexArray().forEach((rowIndex) => {
      const house = getRowOfCells(rowIndex);
      house.forEach((cell) => {
        if (cell.checkForSingleCandidate()) {
          changeMade = true;
        }
      });
    });

    return changeMade;
  };

  constructor() {}
}
