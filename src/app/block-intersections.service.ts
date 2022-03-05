import { Injectable } from '@angular/core';
import {
  candidateFoundinHouse,
  digitFoundinArray,
  digitFoundinHouse,
  getDigitArray,
  getIndexArray,
  removeCandidatesFromArray,
} from './utilities.service';
import { Intersection } from './intersection';
import { Row } from './row';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only candidate in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (): boolean => {
    let changeMade = false;

    // get all row and block intersections
    getIndexArray().forEach((rowIndex) => {
      const row = new Row(rowIndex);
      row.intersectingBlocks.forEach((block) => {
        const intersection = new Intersection(row, true, block);
        if (this.analyseBlockIntersectionSets(intersection)) {
          changeMade = true;
        }
      });
    });
    return changeMade;
  };

  analyseBlockIntersectionSets = (intersection: Intersection): boolean => {
    // checks intersection of a row or column with a block
    // partialHouse1 and partialHouse2 are arrays of length 6
    // that contain the cells that don't intersect.
    // intersection contains 3 cells that are in both the original houses

    let changeMade = false;

    // find pairs or triples of candidates in the intersection
    getDigitArray().forEach((digit) => {
      let count = 0;
      intersection.intersectingCells.forEach((cell) => {
        if (digitFoundinArray(digit, cell.candidates)) {
          count += 1;
        }
      });
      // pair or triple found
      if (count > 1) {
        // if the digit does not exist in the candidates in one partial house
        // then remove the digit from candidates in the other partial house

        // first partial house
        if (!candidateFoundinHouse(intersection.partialHouse1, digit)) {
          intersection.partialHouse2.forEach((cell) => {
            if (removeCandidatesFromArray(cell.candidates, [digit])) {
              changeMade = true;
            }
          });
        }

        // second partial house
        if (!candidateFoundinHouse(intersection.partialHouse2, digit)) {
          intersection.partialHouse1.forEach((cell) => {
            if (removeCandidatesFromArray(cell.candidates, [digit])) {
              changeMade = true;
            }
          });
        }
      }
    });

    return changeMade;
  };

  constructor() {}
}
