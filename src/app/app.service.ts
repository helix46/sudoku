import { Injectable } from '@angular/core';
import { StructCell } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseRow = (row: number): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    for (let column = 0; column < 10; column++) {
      const structCell: StructCell = this.initialiseCell(row, column);
      rowOfCells.push(structCell);
    }
    return rowOfCells;
  };

  initialiseCell = (row: number, column: number): StructCell => {
    return {
      given: false,
      column,
      row,
      large: null,
      possibles: [],
      focussed: false,
      error: false,
    };
  };

  checkRowForDuplicates = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    // structCell: StructCell,
    cells: StructCell[][]
  ): boolean => {
    for (let column = 0; column < 10; column++) {
      const temp = cells[pRow][column];
      if (temp.large === plarge && temp.column !== pColumn) {
        return true;
      }
    }
    return false;
  };

  checkColumnForDuplicates = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    cells: StructCell[][]
  ): boolean => {
    for (let row = 0; row < 10; row++) {
      const temp = cells[row][pColumn];
      if (temp.large === plarge && temp.row !== pRow) {
        return true;
      }
    }
    return false;
  };

  checkForErrors = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        cells[row][column].error = this.checkForDuplicate(
          cells[row][column].large,
          row,
          column,
          cells
        );
      }
    }
  };

  findPossibles = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        cells[row][column].possibles = [];
        // try numbers 1 to 9 in the cell
        for (let num = 1; num < 10; num++) {
          //check if any cell in the same row, column or block has this number
          const duplicate = this.checkForDuplicate(num, row, column, cells);
          // if the number won't cause a duplicate, include it in the possibles
          if (!duplicate) {
            cells[row][column].possibles.push(num);
            cells[row][column].possibles.sort();
          }
        }
      }
    }
    this.findPairsOfPairs(cells);
  };

  findPairsOfPairs = (cells: StructCell[][]) => {
    this.findPairsOfPairsInEachRow(cells);
    this.findPairsOfPairsInEachColumn(cells);
  };

  findPairsOfPairsInEachRow = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      this.findPairsOfPairsInNineCells(cells[row]);
    }
  };

  findPairsOfPairsInEachColumn = (cells: StructCell[][]) => {
    for (let column = 0; column < 10; column++) {
      const arrayOfCells = this.getColumnOfCells(cells, column);
      this.findPairsOfPairsInNineCells(arrayOfCells);
    }
  };

  getColumnOfCells = (cells: StructCell[][], column: number): StructCell[] => {
    const ColumnOfCells: StructCell[] = [];
    for (let row = 0; row < 10; row++) {
      ColumnOfCells.push(cells[row][column]);
    }
    return ColumnOfCells;
  };

  findPairsOfPairsInNineCells = (cells: StructCell[]) => {
    for (let i = 0; i < 10; i++) {
      // if a cell contains 2 possibles
      if (cells[i].possibles.length === 2) {
        const pair = cells[i].possibles;
        // look at the other cells for the same pair
        for (let j = 0; j < 10; j++) {
          // if there are 2 pairs of pairs
          if (this.arrayEquals(pair, cells[j].possibles) && i !== j) {
            // remove the numbers in the shared pair from other possibles
            this.RemoveSharedPairFromNineCells(cells, pair, i, j);
          }
        }
      }
    }
  };

  arrayEquals = (pair: number[], possibles: number[]): boolean => {
    if (pair.length !== 2) {
      return false;
    }
    if (possibles.length !== 2) {
      return false;
    }
    // assumes both arrays have length 2
    return pair[0] === possibles[0] && pair[1] === possibles[1];
  };

  RemoveSharedPairFromNineCells = (
    cells: StructCell[],
    pair: number[],
    i: number,
    j: number
  ) => {
    for (let k = 0; k < 10; k++) {
      if (k !== i && k !== j) {
        this.RemoveSharedPairFromACell(cells[k], pair);
      }
    }
  };

  RemoveSharedPairFromACell = (structCell: StructCell, pair: number[]) => {
    const filteredArray = structCell.possibles.filter((num: number) => {
      if (num === pair[0]) {
        return false;
      }
      if (num === pair[1]) {
        return false;
      }
      return true;
    });
    structCell.possibles = filteredArray;
  };

  initialiseCells = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      const columns: StructCell[] = this.initialiseRow(row);
      cells.push(columns);
    }
  };

  checkForDuplicate = (
    large: number | null,
    row: number,
    column: number,
    cells: StructCell[][]
  ): boolean => {
    if (!large) {
      return false;
    }

    if (this.checkRowForDuplicates(large, row, column, cells)) {
      return true;
    }

    if (this.checkColumnForDuplicates(large, row, column, cells)) {
      return true;
    }

    return this.blockContainsDuplicate(large, row, column, cells);
  };

  blockContainsDuplicate = (
    plarge: number | null,
    pRow: number,
    pColumn: number,
    cells: StructCell[][]
  ): boolean => {
    const startRowOfBlock = this.getStart(pRow);
    const startColumnOfBlock = this.getStart(pColumn);
    for (let row = startRowOfBlock; row < startRowOfBlock + 3; row++) {
      for (
        let column = startColumnOfBlock;
        column < startColumnOfBlock + 3;
        column++
      ) {
        if (
          cells[row][column].large === plarge &&
          cells[row][column].row !== pRow &&
          cells[row][column].column !== pColumn
        ) {
          return true;
        }
      }
    }
    return false;
  };

  getStart = (start: number): number => {
    switch (start) {
      case 0:
      case 1:
      case 2:
        return 0;
      case 3:
      case 4:
      case 5:
        return 3;
      case 6:
      case 7:
      case 8:
        return 6;
    }
    return 0;
  };

  importHardGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [1, 0, 2],
      [2, 0, 3],
      [6, 0, 8],
      [2, 1, 0],
      [1, 1, 4],
      [5, 1, 6],
      [4, 1, 8],
      [9, 2, 1],
      [5, 2, 3],
      [6, 2, 5],
      [2, 3, 2],
      [3, 3, 6],
      [7, 4, 1],
      [1, 4, 3],
      [8, 4, 5],
      [5, 5, 2],
      [6, 5, 6],
      [5, 6, 1],
      [4, 6, 3],
      [1, 6, 5],
      [6, 7, 0],
      [8, 7, 4],
      [1, 7, 6],
      [5, 7, 8],
      [7, 8, 2],
      [6, 8, 3],
      [2, 8, 8],
    ];
    game.forEach((given) => {
      cells[given[1]][given[2]].large = given[0];
      cells[given[1]][given[2]].given = true;
    });
    this.findPossibles(cells);
  };

  importEasyGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    game.forEach((given) => {
      cells[given[1]][given[2]].large = given[0];
      cells[given[1]][given[2]].given = true;
    });
    this.findPossibles(cells);
  };
  constructor() {}
}
