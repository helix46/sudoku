import { Injectable } from '@angular/core';
import { digitType } from './definitions';
import { Cell } from './cell/cell';
import {
  addNumberstoUniqueArray,
  digitFoundinArray,
  getColumnOfCells,
  getIndexArray,
  getRowOfCells,
} from './utilities.service';
import { Block } from './block';

@Injectable({
  providedIn: 'root',
})
export class NakedOrHiddenNCandidatesService {
  getNakedOrHiddenNCandidates = () => {
    for (let i = 1; i < 5; i++) {
      this.getNakedOrHiddenNCandidatesForANumberOfCandidates(i);
    }
  };

  getNakedOrHiddenNCandidatesForANumberOfCandidates = (
    NumberOfCandidates: number
  ) => {
    let changeMade = false;
    getIndexArray().forEach((index) => {
      const rows = getRowOfCells(index);
      if (this.getNakedOrHiddenNCandidatesInAHouse(rows, NumberOfCandidates)) {
        changeMade = true;
      }

      const columns = getColumnOfCells(index);
      if (
        this.getNakedOrHiddenNCandidatesInAHouse(columns, NumberOfCandidates)
      ) {
        changeMade = true;
      }

      const block = new Block(index);
      if (
        this.getNakedOrHiddenNCandidatesInAHouse(
          block.cells,
          NumberOfCandidates
        )
      ) {
        changeMade = true;
      }
    });
  };

  getNakedOrHiddenNCandidatesInAHouse = (
    house: Cell[],
    NumberOfCandidates: number
  ): boolean => {
    let changeMade = false;
    // get all unique candidates in the house
    const setOfCandidates: digitType[] = this.getSetOfCandidates(house);

    // get all combinations from this set of N length
    const combinationsOfCandidates: digitType[][] = this.getCombinations(
      setOfCandidates,
      NumberOfCandidates
    );

    // test each combination of candidates
    combinationsOfCandidates.forEach((candidates) => {
      // get all cells from the house that include at least one candidate from this combination
      const indices: number[] = this.getCellsThatContainCandidates(
        house,
        candidates
      );
      // if the number of cells equals the number of candidates
      // then remove other candidates from these cells
      if (indices.length === NumberOfCandidates) {
        if (this.removeExcludedCandidates(house, indices, candidates)) {
          changeMade = true;
        }
      }
    });
    return changeMade;
  };

  removeExcludedCandidates = (
    house: Cell[],
    indices: number[],
    candidatesToKeep: digitType[]
  ): boolean => {
    let changeMade = false;
    indices.forEach((index) => {
      const tempCandidates = house[index].candidates;
      tempCandidates.forEach((candidate) => {
        if (!digitFoundinArray(candidate, candidatesToKeep)) {
          if (house[index].removeCandidate(candidate)) {
            changeMade = true;
          }
        }
      });
    });
    return changeMade;
  };

  getCellsThatContainCandidates = (
    house: Cell[],
    candidates: digitType[]
  ): number[] => {
    const returnCellIndices: number[] = [];
    house.forEach((cell, index) => {
      candidates.forEach((candidate) => {
        if (cell.candidatesContainDigit(candidate)) {
          addNumberstoUniqueArray(returnCellIndices, [index]);
        }
      });
    });
    return returnCellIndices;
  };

  getSetOfCandidates = (house: Cell[]): digitType[] => {
    const setOfCandidates: digitType[] = [];
    house.forEach((cell) => {
      addNumberstoUniqueArray(setOfCandidates, cell.candidates);
    });
    return setOfCandidates;
  };

  getCombinations = (array: digitType[], combinationLength: number) => {
    function fork(index: number, combination: digitType[]) {
      if (index === array.length) {
        if (combination.length === combinationLength) {
          result.push(combination);
        }
        return;
      }

      fork(index + 1, combination.concat([array[index]]));
      fork(index + 1, combination);
    }

    const result: digitType[][] = [];
    fork(0, []);
    return result;
  };
  constructor() {}
}
