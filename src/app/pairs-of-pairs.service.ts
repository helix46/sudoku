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
    this.utilitiesService.getArray().forEach((row) => {
      if (row === 5) {
        console.log('');
      }
      if (this.findPairsOfPairsInNineCells(cells[row])) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInEachColumn = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((column) => {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      changeMade = this.findPairsOfPairsInNineCells(arrayOfCells);
    });
    return changeMade;
  };

  findPairsOfPairsInEachBlock = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((block) => {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(cells, block);
      if (this.findPairsOfPairsInNineCells(arrayOfCells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findPairsOfPairsInNineCells = (cells: StructCell[]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((i) => {
      // if a cell contains 2 candidates
      if (cells[i].large === null && cells[i].candidates.length === 2) {
        const pair = cells[i].candidates;
        // look at the other cells for the same pair
        this.utilitiesService.getArray().forEach((j) => {
          // if there are 2 pairs of pairs
          if (
            this.utilitiesService.arrayEquals(pair, cells[j].candidates) &&
            i !== j
          ) {
            // remove the numbers in the shared pair from other candidates
            this.RemoveSharedPairFromNineCells(cells, pair, i, j);
            changeMade = true;
          }
        });
      }
    });
    return changeMade;
  };

  RemoveSharedPairFromNineCells = (
    cells: StructCell[],
    pair: number[],
    i: number,
    j: number
  ) => {
    this.utilitiesService.getArray().forEach((k) => {
      if (k !== i && k !== j) {
        this.RemoveSharedPairFromACell(cells[k], pair);
      }
    });
  };

  RemoveSharedPairFromACell = (structCell: StructCell, pair: number[]) => {
    if (structCell.row === 4 && structCell.column === 6) {
      console.log('');
    }
    const filteredArray = structCell.candidates.filter((num: number) => {
      if (num === pair[0]) {
        return false;
      }
      return num !== pair[1];
    });
    if (!structCell.large) {
      if (filteredArray.length === 0) {
        console.log('');
      }
      structCell.candidates = filteredArray;
    }
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
