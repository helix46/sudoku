import { Injectable } from '@angular/core';
import { DuplicatesService } from './duplicates.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { FindSingleCandidateService } from './find-single-candidate.service';
import { UtilitiesService } from './utilities.service';
import { BlockIntersectionsService } from './block-intersections.service';
import { columnType, rowType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseCells = (cells: StructCell[][]) => {
    this.utilitiesService.getRowArray().forEach((rowID) => {
      const columns: StructCell[] = this.initialiseRow(rowID);
      cells.push(columns);
    });
  };

  initialiseRow = (rowID: rowType): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    this.utilitiesService.getColumnArray().forEach((columnID) => {
      const structCell: StructCell = this.initialiseCell(rowID, columnID);
      rowOfCells.push(structCell);
    });
    return rowOfCells;
  };

  initialiseCell = (rowID: rowType, columnID: columnType): StructCell => {
    return {
      given: false,
      columnID,
      rowID,
      digit: '',
      candidates: [],
      focussed: false,
      error: false,
    };
  };

  checkForErrors = (cells: StructCell[][]) => {
    this.utilitiesService.getIndexArray().forEach((rowIndex) => {
      this.utilitiesService.getIndexArray().forEach((columnIndex) => {
        cells[rowIndex][columnIndex].error =
          this.duplicatesService.checkForDuplicate(
            cells[rowIndex][columnIndex].digit,
            rowIndex,
            columnIndex,
            cells
          );
      });
    });
  };

  processCells = (cells: StructCell[][]) => {
    this.findCandidates(cells);
    let changeMadeFindPairsOfPairs = true;
    let changeMadeFindSingleCandidate = true;
    let changeMadeFindBlockIntersections = true;
    while (
      changeMadeFindPairsOfPairs //||
      // changeMadeFindSingleCandidate
      // ||
      //  changeMadeFindBlockIntersections
    ) {
      changeMadeFindPairsOfPairs =
        this.pairsOfPairsService.findPairsOfPairs(cells);
      // changeMadeFindSingleCandidate =
      //  this.findSingleCandidateService.findSingleCandidate(cells);
      // changeMadeFindBlockIntersections =
      //   this.blockIntersectionsService.findBlockIntersections(cells);
    }
  };

  findCandidates = (cells: StructCell[][]) => {
    this.utilitiesService.getArray().forEach((row) => {
      this.utilitiesService.getArray().forEach((column) => {
        if (column === 5 && row === 3) {
          this.utilitiesService.logCell(cells[row][column], 'findCandidates');
        }
        if (!cells[row][column].large) {
          cells[row][column].candidates = [];
          // try numbers 1 to 9 in the cell
          this.utilitiesService.getArray(1).forEach((num) => {
            //check if any cell in the same row, column or block has this number
            const duplicate = this.duplicatesService.checkForDuplicate(
              num,
              row,
              column,
              cells
            );
            // if the number won't cause a duplicate, include it in the candidates
            if (!duplicate) {
              cells[row][column].candidates.push(num);
              cells[row][column].candidates.sort();
            }
          });
        }
      });
    });
  };

  constructor(
    private duplicatesService: DuplicatesService,
    private pairsOfPairsService: PairsOfPairsService,
    private findSingleCandidateService: FindSingleCandidateService,
    private utilitiesService: UtilitiesService,
    private blockIntersectionsService: BlockIntersectionsService
  ) {}
}
