import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class PairsOfPairsService {
  findPairsOfPairs = (cells: StructCell[][]) => {
    this.findPairsOfPairsInEachRow(cells);
    this.findPairsOfPairsInEachColumn(cells);
    this.findPairsOfPairsInEachBlock(cells);
  };

  findPairsOfPairsInEachRow = (cells: StructCell[][]) => {
    for (let row = 0; row < 9; row++) {
      this.findPairsOfPairsInNineCells(cells[row]);
    }
  };

  findPairsOfPairsInEachColumn = (cells: StructCell[][]) => {
    for (let column = 0; column < 9; column++) {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      this.findPairsOfPairsInNineCells(arrayOfCells);
    }
  };

  findPairsOfPairsInEachBlock = (cells: StructCell[][]) => {
    for (let block = 0; block < 9; block++) {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(cells, block);
      this.findPairsOfPairsInNineCells(arrayOfCells);
    }
  };

  findPairsOfPairsInNineCells = (cells: StructCell[]) => {
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
          }
        }
      }
    }
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
