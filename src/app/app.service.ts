import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { DuplicatesService } from './duplicates.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { FindSinglePossibleService } from './find-single-possible.service';
import { UtilitiesService } from './utilities.service';
import { BlockIntersectionsService } from './block-intersections.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseCells = (cells: StructCell[][]) => {
    this.utilitiesService.getArray().forEach((row) => {
      const columns: StructCell[] = this.initialiseRow(row);
      cells.push(columns);
    });
  };

  initialiseRow = (row: number): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    this.utilitiesService.getArray().forEach((column) => {
      const structCell: StructCell = this.initialiseCell(row, column);
      rowOfCells.push(structCell);
    });
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

  checkForErrors = (cells: StructCell[][]) => {
    this.utilitiesService.getArray().forEach((row) => {
      this.utilitiesService.getArray().forEach((column) => {
        cells[row][column].error = this.duplicatesService.checkForDuplicate(
          cells[row][column].large,
          row,
          column,
          cells
        );
      });
    });
  };

  processCells = (cells: StructCell[][]) => {
    this.findPossibles(cells);
    let changeMadeFindPairsOfPairs = true;
    let changeMadeFindSinglePossible = true;
    let changeMadeFindBlockIntersections = true;
    // while (
    //   changeMadeFindPairsOfPairs ||
    //   changeMadeFindSinglePossible ||
    //   changeMadeFindBlockIntersections
    // ) {
    changeMadeFindPairsOfPairs =
      this.pairsOfPairsService.findPairsOfPairs(cells);
    changeMadeFindSinglePossible =
      this.findSinglePossibleService.findSinglePossible(cells);
    changeMadeFindBlockIntersections =
      this.blockIntersectionsService.findBlockIntersections(cells);
    // }
  };

  findPossibles = (cells: StructCell[][]) => {
    this.utilitiesService.getArray().forEach((row) => {
      this.utilitiesService.getArray().forEach((column) => {
        if (column === 5 && row === 3) {
          this.utilitiesService.logCell(cells[row][column], 'findPossibles');
        }
        if (!cells[row][column].large) {
          cells[row][column].possibles = [];
          // try numbers 1 to 9 in the cell
          this.utilitiesService.getArray(1).forEach((num) => {
            //check if any cell in the same row, column or block has this number
            const duplicate = this.duplicatesService.checkForDuplicate(
              num,
              row,
              column,
              cells
            );
            // if the number won't cause a duplicate, include it in the possibles
            if (!duplicate) {
              cells[row][column].possibles.push(num);
              cells[row][column].possibles.sort();
            }
          });
        }
      });
    });
  };

  constructor(
    private duplicatesService: DuplicatesService,
    private pairsOfPairsService: PairsOfPairsService,
    private findSinglePossibleService: FindSinglePossibleService,
    private utilitiesService: UtilitiesService,
    private blockIntersectionsService: BlockIntersectionsService
  ) {}
}
