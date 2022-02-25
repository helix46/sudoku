import { Injectable } from '@angular/core';
import { digitType } from './definitions';
import { Cell } from './cell/cell';
import {
  arrayEquals,
  getColumnOfCells,
  getIndexArray,
  getRowOfCells,
} from './utilities.service';
import { Block } from './block';

@Injectable({
  providedIn: 'root',
})
export class PairsOfPairsService {
  findPairsOfPairs = (): boolean => {
    let changeMade = false;
    if (this.findPairsOfPairsInEachRow()) {
      changeMade = true;
    }
    if (this.findPairsOfPairsInEachColumn()) {
      changeMade = true;
    }
    if (this.findPairsOfPairsInEachBlock()) {
      changeMade = true;
    }
    return changeMade;
  };

  findPairsOfPairsInEachRow = (): boolean => {
    let changeMade = false;
    getIndexArray().forEach((rowIndex) => {
      const house = getRowOfCells(rowIndex);
      if (this.findPairsOfPairsInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInEachColumn = (): boolean => {
    let changeMade = false;
    getIndexArray().forEach((column) => {
      const house = getColumnOfCells(column);
      if (this.findPairsOfPairsInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInEachBlock = (): boolean => {
    let changeMade = false;
    getIndexArray().forEach((blockIndex) => {
      const block: Block = new Block(blockIndex);
      if (this.findPairsOfPairsInHouse(block.cells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInHouse = (house: Cell[]): boolean => {
    let changeMade = false;
    getIndexArray().forEach((i) => {
      // if a cell contains 2 candidates
      if (house[i].digit === '' && house[i].candidates.length === 2) {
        const pair = house[i].candidates;
        // look at the other cells for the same pair
        getIndexArray().forEach((j) => {
          // if there are 2 pairs of pairs
          if (arrayEquals(pair, house[j].candidates) && i !== j) {
            // remove the numbers in the shared pair from other candidates
            if (this.RemoveSharedPairFromNineCells(house, pair, i, j)) {
              changeMade = true;
            }
          }
        });
      }
    });
    return changeMade;
  };

  RemoveSharedPairFromNineCells = (
    cells: Cell[],
    pair: digitType[],
    i: number,
    j: number
  ): boolean => {
    let changeMade = false;
    getIndexArray().forEach((k) => {
      if (k !== i && k !== j) {
        if (this.RemoveSharedPairFromACell(cells[k], pair)) {
          changeMade = true;
        }
      }
    });
    return changeMade;
  };

  RemoveSharedPairFromACell = (cell: Cell, pair: digitType[]): boolean => {
    let changeMade = false;
    const filteredArray = cell.candidates.filter((num: digitType) => {
      if (num === pair[0]) {
        return false;
      }
      return num !== pair[1];
    });
    if (!cell.digit) {
      if (!arrayEquals(cell.candidates, filteredArray)) {
        cell.candidates = filteredArray;
        cell.checkForSingleCandidate();
        changeMade = true;
      }
    }
    return changeMade;
  };

  constructor() {}
}
