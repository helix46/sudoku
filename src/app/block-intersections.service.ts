import { Injectable } from '@angular/core';
import { getIndexArray } from './utilities.service';
import { digitType, indexType } from './definitions';
import { Block } from './block';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only candidate in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (): boolean => {
    let changeMade = false;

    getIndexArray().forEach((blockIndex) => {
      if (this.findIntersectionsForBlock(blockIndex)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  // for each row/column of a block, find the candidates for that row/column
  // find candidates that do not exist in other rows/columns of that block
  // for each of these candidates, remove it from the rest of the intersecting row / column
  findIntersectionsForBlock = (blockIndex: indexType): boolean => {
    let changeMade = false;

    if (blockIndex === 7) {
      console.log('');
    }

    const block: Block = new Block(blockIndex);

    for (
      let rowToAnalyse = block.startRowIndex;
      rowToAnalyse < block.startRowIndex + 3;
      rowToAnalyse++
    ) {
      this.analyseBlockRowIntersections(
        blockIndex,
        block.uniqueCandidatesForBlock,
        rowToAnalyse
      );
    }

    return changeMade;
  };

  analyseBlockRowIntersections = (
    block: indexType,
    UniqueCandidatesForBlock: digitType[],
    rowToAnalyse: indexType
  ) => {
    // remove candidates that are in a different row of this block
    this.removeDifferentRowCandidates(
      block,
      UniqueCandidatesForBlock,
      rowToAnalyse
    );
  };

  removeDifferentRowCandidates = (
    blockIndex: indexType,
    UniqueCandidatesForBlock: digitType[],
    rowToAnalyse: indexType
  ) => {
    const block: Block = new Block(blockIndex);

    //remove possibilities
    for (let row = block.startRowIndex; row < block.startRowIndex + 3; row++) {
      block.cells.forEach((cell) => {
        if (cell.rowIndex !== rowToAnalyse && !cell.digit) {
          this.removeCandidatesFromArray(
            UniqueCandidatesForBlock,
            cell.candidates
          );
        }
      });
    }
  };

  removeCandidatesFromArray = (
    arrayToRemoveFrom: digitType[],
    numbersToRemove: digitType[]
  ): boolean => {
    const initialLength = arrayToRemoveFrom.length;
    numbersToRemove.forEach((numToRemove) => {
      const pos = arrayToRemoveFrom.findIndex((num) => {
        return num === numToRemove;
      });
      // if found
      if (pos !== -1) {
        // remove
        arrayToRemoveFrom.splice(pos, 1);
      }
    });
    return initialLength !== arrayToRemoveFrom.length;
  };

  constructor() {}
}
