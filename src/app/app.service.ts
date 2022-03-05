import { Injectable } from '@angular/core';
import { DuplicatesService } from './duplicates.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { FindSingleCandidateService } from './find-single-candidate.service';
import {
  allCells,
  addNumberstoUniqueArray,
  getDigitArray,
  getIndexArray,
} from './utilities.service';
// import { BlockIntersectionsService } from './block-intersections.service';
import { indexType } from './definitions';
import { BlockIntersectionsService } from './block-intersections.service';
import { NakedSinglesService } from './naked-singles.service';
import { Cell } from './cell/cell';
import { NakedOrHiddenNCandidatesService } from './naked-or-hidden-n-candidates.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  initialiseCells = () => {
    allCells.splice(0);
    getIndexArray().forEach((rowIndex) => {
      const columns: Cell[] = this.initialiseRow(rowIndex);
      allCells.push(columns);
    });
  };

  initialiseRow = (rowIndex: indexType): Cell[] => {
    const rowOfCells: Cell[] = [];
    getIndexArray().forEach((columnIndex) => {
      const cell: Cell = this.initialiseCell(rowIndex, columnIndex);
      rowOfCells.push(cell);
    });
    return rowOfCells;
  };

  initialiseCell = (rowIndex: indexType, columnIndex: indexType): Cell => {
    return new Cell(rowIndex, columnIndex);
  };

  checkForErrors = () => {
    getIndexArray().forEach((rowIndex) => {
      getIndexArray().forEach((columnIndex) => {
        allCells[rowIndex][columnIndex].error =
          this.duplicatesService.digitExistInCellsRowColumnOrBlock(
            allCells[rowIndex][columnIndex].digit,
            rowIndex,
            columnIndex
          );
      });
    });
  };

  processCells = (findCandidates: boolean) => {
    //let changeMadeFindPairsOfPairs = true;
    // let changeMadeFindSingleCandidate = true;
    let changeMadeFindBlockIntersections = true;
    //  let changeMadeNakedSingles = true;
    let changeMadeNakedOrHiddenNCandidates = true;
    if (findCandidates) {
      this.findCandidates();
    }
    while (
      // changeMadeFindPairsOfPairs ||
      // changeMadeFindSingleCandidate ||
      // changeMadeNakedSingles ||
      changeMadeFindBlockIntersections ||
      changeMadeNakedOrHiddenNCandidates
    ) {
      // changeMadeFindPairsOfPairs = this.pairsOfPairsService.findPairsOfPairs();
      // changeMadeFindSingleCandidate =
      //   this.findSingleCandidateService.findSingleCandidate();
      //  changeMadeNakedSingles = this.nakedSinglesService.checkForNakedSingles();
      changeMadeFindBlockIntersections =
        this.blockIntersectionsService.findBlockIntersections();
      changeMadeNakedOrHiddenNCandidates =
        this.nakedOrHiddenNCandidatesService.getNakedOrHiddenNCandidates();
    }

    this.checkForErrors();
  };

  findCandidates = () => {
    getIndexArray().forEach((rowIndex) => {
      getIndexArray().forEach((columnIndex) => {
        if (!allCells[rowIndex][columnIndex].digit) {
          allCells[rowIndex][columnIndex].candidates = [];
          getDigitArray().forEach((digit) => {
            //check if any cell in the same row, column or block has this number
            const digitExists =
              this.duplicatesService.digitExistInCellsRowColumnOrBlock(
                digit,
                rowIndex,
                columnIndex
              );
            // if the number won't cause a duplicate, include it in the candidates
            if (!digitExists) {
              if (
                addNumberstoUniqueArray(
                  allCells[rowIndex][columnIndex].candidates,
                  [digit]
                )
              ) {
                allCells[rowIndex][columnIndex].candidates.sort();
              }
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
    private blockIntersectionsService: BlockIntersectionsService,
    private nakedSinglesService: NakedSinglesService,
    private nakedOrHiddenNCandidatesService: NakedOrHiddenNCandidatesService
  ) {}
}
