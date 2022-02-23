import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { digitType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class PairsOfPairsService {
  findPairsOfPairs = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    if (this.findPairsOfPairsInEachRow(cells)) {
      changeMade = true;
    }
    if (this.findPairsOfPairsInEachColumn(cells)) {
      changeMade = true;
    }
    if (this.findPairsOfPairsInEachBlock(cells)) {
      changeMade = true;
    }
    return changeMade;
  };

  findPairsOfPairsInEachRow = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((rowIndex) => {
      const house = this.utilitiesService.getRowOfCells(cells, rowIndex);
      if (this.findPairsOfPairsInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInEachColumn = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((column) => {
      const house = this.utilitiesService.getColumnOfCells(cells, column);
      changeMade = this.findPairsOfPairsInHouse(house);
    });
    return changeMade;
  };

  findPairsOfPairsInEachBlock = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((block) => {
      const house = this.utilitiesService.getBlockOfCells(block, cells);
      if (this.findPairsOfPairsInHouse(house)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInHouse = (house: StructCell[]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((i) => {
      // if a cell contains 2 candidates
      if (house[i].digit === '' && house[i].candidates.length === 2) {
        const pair = house[i].candidates;
        // look at the other cells for the same pair
        this.utilitiesService.getIndexArray().forEach((j) => {
          // if there are 2 pairs of pairs
          if (
            this.utilitiesService.arrayEquals(pair, house[j].candidates) &&
            i !== j
          ) {
            // remove the numbers in the shared pair from other candidates
            this.RemoveSharedPairFromNineCells(house, pair, i, j);
            changeMade = true;
          }
        });
      }
    });
    return changeMade;
  };

  RemoveSharedPairFromNineCells = (
    cells: StructCell[],
    pair: digitType[],
    i: number,
    j: number
  ) => {
    this.utilitiesService.getIndexArray().forEach((k) => {
      if (k !== i && k !== j) {
        this.RemoveSharedPairFromACell(cells[k], pair);
      }
    });
  };

  RemoveSharedPairFromACell = (structCell: StructCell, pair: digitType[]) => {
    if (structCell.rowIndex === 4 && structCell.columnIndex === 6) {
      console.log('');
    }
    const filteredArray = structCell.candidates.filter((num: digitType) => {
      if (num === pair[0]) {
        return false;
      }
      return num !== pair[1];
    });
    if (!structCell.digit) {
      if (filteredArray.length === 0) {
        console.log('');
      }
      structCell.candidates = filteredArray;
    }
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
