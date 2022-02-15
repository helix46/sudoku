import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only possible in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((block) => {
      if (this.findIntersectionsForBlock(block, cells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  // for each row/column of a block, find the possibles for that row/column
  // find possibles that do not exist in other rows/columns of that block
  // for each of these possibles, remove it from the rest of the intersecting row / column
  findIntersectionsForBlock = (
    block: number,
    cells: StructCell[][]
  ): boolean => {
    let changeMade = false;

    if (block === 7) {
      console.log('');
    }

    let UniquePossiblesForBlock: number[] =
      this.utilitiesService.getUniquePossiblesForBlock(cells, block);

    const startRow = this.utilitiesService.getBlockStartRow(block);
    for (
      let rowToAnalyse = startRow;
      rowToAnalyse < startRow + 3;
      rowToAnalyse++
    ) {
      this.analyseBlockRowIntersections(
        cells,
        block,
        UniquePossiblesForBlock,
        rowToAnalyse
      );
    }

    //
    // // remove these possibles from the rest of the row outside the block
    // this.utilitiesService.getArray().forEach((column) => {
    //   // if a cell is outside the block and the large has not been chosen
    //   if (
    //     (column < startCol || column >= startCol + 3) &&
    //     !cells[row][column].large
    //   ) {
    //     if (
    //       this.removePossiblesFromArray(
    //         cells[row][column].possibles,
    //         possiblesForRowOfBlock
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
    block: number,
    UniquePossiblesForBlock: number[],
    rowToAnalyse: number
  ) => {
    // remove possibles that are in a different row of this block
    this.removeDifferentRowPossibles(
      cells,
      block,
      UniquePossiblesForBlock,
      rowToAnalyse
    );

    console.log(
      'block: ' + block + ' UniquePossiblesForBlock: ',
      UniquePossiblesForBlock
    );
  };

  removeDifferentRowPossibles = (
    cells: StructCell[][],
    block: number,
    UniquePossiblesForBlock: number[],
    rowToAnalyse: number
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
          this.removePossiblesFromArray(
            UniquePossiblesForBlock,
            structCell.possibles
          );
        }
      });
    }
  };

  removePossiblesFromArray = (
    arrayToRemoveFrom: number[],
    numbersToRemove: number[]
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
