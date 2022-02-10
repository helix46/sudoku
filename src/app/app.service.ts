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
      smalls: [],
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

  findSmalls = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        cells[row][column].smalls = [];
        for (let num = 1; num < 10; num++) {
          const duplicate = this.checkForDuplicate(num, row, column, cells);
          if (!duplicate) {
            cells[row][column].smalls.push(num);
            cells[row][column].smalls.sort();
          }
        }
      }
    }
    // this.findPairsOfPairs(cells);
  };

  findPairsOfPairs = (cells: StructCell[][]) => {
    this.findPairsOfPairsInEachRow(cells);
  };

  findPairsOfPairsInEachRow = (cells: StructCell[][]) => {
    for (let row = 0; row < 10; row++) {
      this.findPairsOfPairsInNineCells(cells[row]);
    }
  };

  findPairsOfPairsInNineCells = (cells: StructCell[]) => {
    for (let i = 0; i < 10; i++) {
      // if a cell contains 2 smalls
      if (cells[i].smalls.length === 2) {
        const pair = cells[i].smalls;
        // look at the other cells for the same pair
        for (let j = 0; j < 10; j++) {
          // if there are 2 pairs of pairs
          if (this.arrayEquals(pair, cells[j].smalls) && i !== j) {
            // remove the numbers in the shared pair from other smalls
            this.RemoveSharedPairFromNineCells(cells, pair, i, j);
          }
        }
      }
    }
  };

  arrayEquals = (pair: number[], smalls: number[]): boolean => {
    if (pair.length !== 2) {
      return false;
    }
    if (smalls.length !== 2) {
      return false;
    }
    // assumes both arrays have length 2
    return pair[0] === smalls[0] && pair[1] === smalls[1];
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
    const filteredArray = structCell.smalls.filter((num: number) => {
      if (num === pair[0]) {
        return false;
      }
      if (num === pair[1]) {
        return false;
      }
      return true;
    });
    structCell.smalls = filteredArray;
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

  constructor() {}
}
