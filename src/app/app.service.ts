import { Injectable } from '@angular/core';
import { DuplicatesService } from './duplicates.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { FindSingleCandidateService } from './find-single-candidate.service';
import { UtilitiesService } from './utilities.service';
// import { BlockIntersectionsService } from './block-intersections.service';
import { indexType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseCells = (cells: StructCell[][]) => {
    this.utilitiesService.getIndexArray().forEach((rowIndex) => {
      const columns: StructCell[] = this.initialiseRow(rowIndex);
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
          this.duplicatesService.digitExistInCellsRowColumnOrBlock(
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
    //   let changeMadeFindSingleCandidate = true;
    //    let changeMadeFindBlockIntersections = true;
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
          this.utilitiesService.getDigitArray().forEach((digit) => {
            //check if any cell in the same row, column or block has this number
            const digitExists =
              this.duplicatesService.digitExistInCellsRowColumnOrBlock(
                digit,
                rowIndex,
                columnIndex,
                cells
              );
            // if the number won't cause a duplicate, include it in the candidates
            if (!digitExists) {
              cells[rowIndex][columnIndex].candidates.push(digit);
              cells[rowIndex][columnIndex].candidates.sort();
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
    private utilitiesService: UtilitiesService // private blockIntersectionsService: BlockIntersectionsService
  ) {}
}
