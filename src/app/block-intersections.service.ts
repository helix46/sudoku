import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { indexType, candidateType, StructCell } from './definitions';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only candidate in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getIndexArray().forEach((blockIndex) => {
      if (this.findIntersectionsForBlock(blockIndex, cells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  // for each row/column of a block, find the candidates for that row/column
  // find candidates that do not exist in other rows/columns of that block
  // for each of these candidates, remove it from the rest of the intersecting row / column
  findIntersectionsForBlock = (
    block: indexType,
    cells: StructCell[][]
  ): boolean => {
    let changeMade = false;

    if (block === 7) {
      console.log('');
    }

    let UniqueCandidatesForBlock: candidateType[] =
      this.utilitiesService.getUniqueCandidatesForBlock(cells, block);

    const startRow = this.utilitiesService.getBlockStartRow(block);
    for (
      let rowToAnalyse = startRow;
      rowToAnalyse < startRow + 3;
      rowToAnalyse++
    ) {
      this.analyseBlockRowIntersections(
        cells,
        block,
        UniqueCandidatesForBlock,
        rowToAnalyse
      );
    }

    //
    // // remove these candidates from the rest of the row outside the block
    // this.utilitiesService.getArray().forEach((column) => {
    //   // if a cell is outside the block and the large has not been chosen
    //   if (
    //     (column < startCol || column >= startCol + 3) &&
    //     !cells[row][column].large
    //   ) {
    //     if (
    //       this.removeCandidatesFromArray(
    //         cells[row][column].candidates,
    //         candidatesForRowOfBlock
    //       )
    //     ) {
    //       changeMade = true;
    //     }
    //   }
    // });

    return changeMade;
  };

  analyseBlockRowIntersections = (
    cells: StructCell[][],
    block: indexType,
    UniqueCandidatesForBlock: candidateType[],
    rowToAnalyse: indexType
  ) => {
    // remove candidates that are in a different row of this block
    this.removeDifferentRowCandidates(
      cells,
      block,
      UniqueCandidatesForBlock,
      rowToAnalyse
    );

    console.log(
      'block: ' + block + ' UniqueCandidatesForBlock: ',
      UniqueCandidatesForBlock
    );
  };

  removeDifferentRowCandidates = (
    cells: StructCell[][],
    block: indexType,
    UniquecandidatesForBlock: candidateType[],
    rowToAnalyse: indexType
  ) => {
    const startRow = this.utilitiesService.getBlockStartRow(block);
    const AllCellsForBlock = this.utilitiesService.getBlockOfCells(
      cells,
      block
    );

    if (block === 7 && rowToAnalyse === 6) {
      console.log('');
    }
    //remove possiblitiles
    for (let row = startRow; row < startRow + 3; row++) {
      AllCellsForBlock.forEach((structCell) => {
        if (structCell.row !== rowToAnalyse && !structCell.large) {
          this.removeCandidatesFromArray(
            UniqueCandidatesForBlock,
            structCell.candidates
          );
        }
      });
    }
  };

  removeCandidatesFromArray = (
    arrayToRemoveFrom: indexType[],
    numbersToRemove: candidateType[]
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

  constructor(private utilitiesService: UtilitiesService) {}
}
