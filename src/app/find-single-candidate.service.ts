import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class FindSingleCandidateService {
  findSingleCandidate = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    //find number in row / col / block that is only candidate in one cell
    if (this.findSingleCandidateInRow(cells)) {
      changeMade = true;
    }
    if (this.findSingleCandidateInColumn(cells)) {
      changeMade = true;
    }
    if (this.findSingleCandidateInBlock(cells)) {
      changeMade = true;
    }
    return changeMade;
  };

  findSingleCandidateInRow = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((row) => {
      if (this.setSingleCandidateInNineCells(cells[row])) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSingleCandidateInColumn = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((column) => {
      const arrayOfCells = this.utilitiesService.getColumnOfCells(
        cells,
        column
      );
      if (this.setSingleCandidateInNineCells(arrayOfCells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findSingleCandidateInBlock = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((block) => {
      const arrayOfCells = this.utilitiesService.getBlockOfCells(block, cells);
      if (this.setSingleCandidateInNineCells(arrayOfCells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  setSingleCandidateInNineCells = (cells: StructCell[]): boolean => {
    let changeMade = false;
    // go through numbers 1 - 9
    this.utilitiesService.getDigitArray().forEach((num) => {
      let found = false;
      let duplicateFound = false;
      let indexFoundin = 0;
      this.utilitiesService.getIndexArray().forEach((index) => {
        if (!cells[index].digit) {
          cells[index].candidates.forEach((candidate) => {
            if (candidate === num) {
              if (found) {
                duplicateFound = true;
              } else {
                found = true;
                indexFoundin = index;
              }
            }
          });
        }
      });
      // if number only found in the candidates of one cell, then set the candidates to this number
      if (found && !duplicateFound) {
        if (!cells[indexFoundin].digit) {
          if (
            !this.utilitiesService.arrayEquals(cells[indexFoundin].candidates, [
              num,
            ])
          ) {
            changeMade = true;
          }
          cells[indexFoundin].candidates = [num];
        }
      }
    });
    return changeMade;
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
