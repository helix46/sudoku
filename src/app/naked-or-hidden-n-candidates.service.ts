import { Injectable } from '@angular/core';
import { digitType } from './definitions';
import { Cell } from './cell/cell';
import {
  addNumberstoUniqueArray,
  digitFoundinArray,
} from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class NakedOrHiddenNCandidatesService {
  getNakedOrHiddenNCandidatesInAHouse = (house: Cell[], N: number) => {
    // get all unique candidates in the house
    const setOfCandidates: digitType[] = this.getSetOfCandidates(house);

    // get all combinations from this set of N length
    const combinationsOfCandidates: digitType[][] = this.getCombinations(
      setOfCandidates,
      N
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
      if (indices.length === N) {
        this.removeExcludedCandidates(house, indices, candidates);
      }
    });
  };

  removeExcludedCandidates = (
    house: Cell[],
    indices: number[],
    candidatesToKeep: digitType[]
  ) => {
    indices.forEach((index) => {
      const tempCandidates = house[index].candidates;
      tempCandidates.forEach((candidate) => {
        if (!digitFoundinArray(candidate, candidatesToKeep)) {
          house[index].removeCandidate(candidate);
        }
      });
    });
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
