import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

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
    for (let row = 0; row < 9; row++) {
      changeMade = this.findPairsOfPairsInNineCells(cells[row]);
    }
    return changeMade;
  };

  findPairsOfPairsInEachColumn = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    for (let column = 0; column < 9; column++) {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      changeMade = this.findPairsOfPairsInNineCells(arrayOfCells);
    }
    return changeMade;
  };

  findPairsOfPairsInEachBlock = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    for (let block = 0; block < 9; block++) {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(cells, block);
      changeMade = this.findPairsOfPairsInNineCells(arrayOfCells);
    }
    return changeMade;
  };

  findPairsOfPairsInNineCells = (cells: StructCell[]): boolean => {
    let changeMade = false;
    for (let i = 0; i < 9; i++) {
      // if a cell contains 2 possibles
      if (cells[i].large === null && cells[i].possibles.length === 2) {
        const pair = cells[i].possibles;
        // look at the other cells for the same pair
        for (let j = 0; j < 9; j++) {
          // if there are 2 pairs of pairs
          if (this.arrayEquals(pair, cells[j].possibles) && i !== j) {
            // remove the numbers in the shared pair from other possibles
            this.RemoveSharedPairFromNineCells(cells, pair, i, j);
            changeMade = true;
          }
        }
      }
    }
    return changeMade;
  };

  RemoveSharedPairFromNineCells = (
    cells: StructCell[],
    pair: number[],
    i: number,
    j: number
  ) => {
    for (let k = 0; k < 9; k++) {
      if (k !== i && k !== j) {
        this.RemoveSharedPairFromACell(cells[k], pair);
      }
    }
  };

  RemoveSharedPairFromACell = (structCell: StructCell, pair: number[]) => {
    const filteredArray = structCell.possibles.filter((num: number) => {
      if (structCell.column === 5 && structCell.row === 3) {
        this.utilitiesService.logCell(structCell, 'RemoveSharedPairFromACell');
      }

      // return structCell.possibles.filter((num: number) => {
      if (num === pair[0]) {
        return false;
      }
      if (num === pair[1]) {
        return false;
      }
      return true;
    });
    if (!structCell.large) {
      structCell.possibles = filteredArray;
    }
  };

  arrayEquals = (pair: number[], possibles: number[]): boolean => {
    if (pair.length !== 2) {
      return false;
    }
    if (possibles.length !== 2) {
      return false;
    }
    return pair[0] === possibles[0] && pair[1] === possibles[1];
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
