import { Injectable } from '@angular/core';
import {
  digitFoundinArray,
  digitFoundinHouse,
  getDigitArray,
  getIndexArray,
  removeCandidatesFromArray,
} from './utilities.service';
import { digitType, indexType } from './definitions';
import { Block } from './block';
import { Cell } from './cell/cell';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only candidate in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (): boolean => {
    let changeMade = false;

    // getIndexArray().forEach((blockIndex) => {
    //   if (this.findIntersectionsForBlock(blockIndex)) {
    //     changeMade = true;
    //   }
    // });
    // return changeMade;
  };

  // for each row/column of a block, find the candidates for that row/column
  // find candidates that do not exist in other rows/columns of that block
  // for each of these candidates, remove it from the rest of the intersecting row / column
  // findIntersectionsForBlock = (blockIndex: indexType): boolean => {
  //   let changeMade = false;
  //
  //   if (blockIndex === 7) {
  //     console.log('');
  //   }
  //
  //   const block: Block = new Block(blockIndex);
  //
  //   for (
  //     let rowToAnalyse = block.startRowIndex;
  //     rowToAnalyse < block.startRowIndex + 3;
  //     rowToAnalyse++
  //   ) {
  //     this.analyseBlockRowIntersections(
  //       blockIndex,
  //       block.uniqueCandidatesForBlock,
  //       rowToAnalyse
  //     );
  //   }
  //
  //   return changeMade;
  // };

  analyseBlockIntersectionSets = (
    partialHouse1: Cell[],
    partialHouse2: Cell[],
    intersection: Cell[]
  ): boolean => {
    // checks intersection of a row or column with a block
    // partialHouse1 and partialHouse2 are arrays of length 6
    // that contain the cells that don't intersect.
    // intersection contains 3 cells that are in both the original houses

    let changeMade = false;

    // find pairs or triples of candidates in the intersection
    getDigitArray().forEach((digit) => {
      let count = 0;
      intersection.forEach((cell) => {
        if (digitFoundinArray(digit, cell.candidates)) {
          count += 1;
        }
      });
      // pair or triple found
      if (count > 1) {
        // if the digit does not exist in the candidates in one partial house
        // then remove the digit from candidates in the other partial house

        // first partial house
        if (!digitFoundinHouse(partialHouse1, digit)) {
          partialHouse2.forEach((cell) => {
            if (removeCandidatesFromArray(cell.candidates, [digit])) {
              changeMade = true;
            }
          });
        }

        // second partial house
        if (!digitFoundinHouse(partialHouse2, digit)) {
          partialHouse1.forEach((cell) => {
            if (removeCandidatesFromArray(cell.candidates, [digit])) {
              changeMade = true;
            }
          });
        }
      }
    });

    return changeMade;
  };

  // analyseBlockRowIntersections = (
  //   block: indexType,
  //   UniqueCandidatesForBlock: digitType[],
  //   rowToAnalyse: indexType
  // ) => {
  //   // remove candidates that are in a different row of this block
  //   this.removeDifferentRowCandidates(
  //     block,
  //     UniqueCandidatesForBlock,
  //     rowToAnalyse
  //   );
  // };
  //
  // removeDifferentRowCandidates = (
  //   blockIndex: indexType,
  //   UniqueCandidatesForBlock: digitType[],
  //   rowToAnalyse: indexType
  // ) => {
  //   const block: Block = new Block(blockIndex);
  //
  //   //remove possibilities
  //   for (let row = block.startRowIndex; row < block.startRowIndex + 3; row++) {
  //     block.cells.forEach((cell) => {
  //       if (cell.rowIndex !== rowToAnalyse && !cell.digit) {
  //         this.removeCandidatesFromArray(
  //           UniqueCandidatesForBlock,
  //           cell.candidates
  //         );
  //       }
  //     });
  //   }
  // };

  constructor() {}
}
