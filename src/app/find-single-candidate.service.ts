import { Injectable } from '@angular/core';
import {
  digitFoundinHouse,
  getColumnOfCells,
  getDigitArray,
  getIndexArray,
  getRowOfCells,
} from './utilities.service';
import { Cell } from './cell/cell';
import { Block } from './block';

@Injectable({
  providedIn: 'root',
})
export class FindSingleCandidateService {
  findSingleCandidate = (): boolean => {
    let changeMade = false;
    //find number in row / col / block that is only a candidate in one cell
    if (this.findSingleCandidateInRow()) {
      changeMade = true;
    }
    if (this.findSingleCandidateInColumn()) {
      changeMade = true;
    }
    if (this.findSingleCandidateInBlock()) {
      changeMade = true;
    }
    return changeMade;
  };

  findSingleCandidateInRow = (): boolean => {
    let changeMade = false;

    getIndexArray().forEach((rowIndex) => {
      const house = getRowOfCells(rowIndex);
      if (this.findAndSetSingleCandidateInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSingleCandidateInColumn = (): boolean => {
    let changeMade = false;
    getIndexArray().forEach((column) => {
      const house = getColumnOfCells(column);
      if (this.findAndSetSingleCandidateInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSingleCandidateInBlock = (): boolean => {
    let changeMade = false;
    // for each block
    getIndexArray().forEach((blockIndex) => {
      const block = new Block(blockIndex);
      if (this.findAndSetSingleCandidateInHouse(block.cells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findAndSetSingleCandidateInHouse = (house: Cell[]): boolean => {
    let changeMade = false;
    // go through digits 1 - 9
    getDigitArray().forEach((digit) => {
      if (!digitFoundinHouse(house, digit)) {
        const filteredHouse = house.filter((cell) => {
          return cell.candidatesContainDigit(digit);
        });
        if (filteredHouse.length === 1) {
          filteredHouse[0].candidates = [];
          filteredHouse[0].digit = digit;
          changeMade = true;
        }
      }
    });
    return changeMade;
  };

  constructor() {}
}
