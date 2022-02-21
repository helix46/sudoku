import { Injectable } from '@angular/core';
import { DuplicatesService } from './duplicates.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { FindSingleCandidateService } from './find-single-candidate.service';
import { UtilitiesService } from './utilities.service';
import { BlockIntersectionsService } from './block-intersections.service';
import { indexType, StructCell } from './definitions';

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

  initialiseRow = (rowIndex: indexType): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    this.utilitiesService.getIndexArray().forEach((columnIndex) => {
      const structCell: StructCell = this.initialiseCell(rowIndex, columnIndex);
      rowOfCells.push(structCell);
    });
    return rowOfCells;
  };

  initialiseCell = (
    rowIndex: indexType,
    columnIndex: indexType
  ): StructCell => {
    return {
      given: false,
      columnIndex,
      rowIndex,
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
            cells[rowIndex][columnIndex],
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
    this.utilitiesService.getIndexArray().forEach((rowIndex) => {
      this.utilitiesService.getIndexArray().forEach((columnIndex) => {
        const tempCell = cells[rowIndex][columnIndex];
        if (!tempCell.digit) {
          tempCell.candidates = [];
          //check if any cell in the same row, column or block has this number
          const duplicate = this.duplicatesService.checkForDuplicate(
            tempCell,
            cells
          );
          // if the number won't cause a duplicate, include it in the candidates
          if (!duplicate) {
            cells[row][column].candidates.push(num);
            cells[row][column].candidates.sort();
          }
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
