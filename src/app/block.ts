import { digitType, indexType } from './definitions';
import { Cell } from './cell/cell';
import { addNumberstoUniqueArray, allCells } from './utilities.service';

export class Block {
  blockIndex!: indexType;
  startRowIndex!: indexType;
  startColumnIndex!: indexType;
  cells: Cell[] = [];
  uniqueCandidatesForBlock: digitType[] = [];

  getBlockStartRow = (): indexType => {
    switch (this.blockIndex) {
      case 0:
      case 1:
      case 2:
        return 0;

      case 3:
      case 4:
      case 5:
        return 3;

      case 6:
      case 7:
      case 8:
        return 6;
    }
    throw new Error('Start row not found in block: ' + this.blockIndex);
  };

  getBlockStartColumn = (): indexType => {
    switch (this.blockIndex) {
      case 0:
      case 3:
      case 6:
        return 0;

      case 1:
      case 4:
      case 7:
        return 3;

      case 2:
      case 5:
      case 8:
        return 6;
    }
    throw new Error('Start column not found in block: ' + this.blockIndex);
  };

  getBlockOfCells = () => {
    const startRow = this.getBlockStartRow();
    const startCol = this.getBlockStartColumn();

    this.cells.push(allCells[startRow][startCol]);
    this.cells.push(allCells[startRow][startCol + 1]);
    this.cells.push(allCells[startRow][startCol + 2]);
    this.cells.push(allCells[startRow + 1][startCol]);
    this.cells.push(allCells[startRow + 1][startCol + 1]);
    this.cells.push(allCells[startRow + 1][startCol + 2]);
    this.cells.push(allCells[startRow + 2][startCol]);
    this.cells.push(allCells[startRow + 2][startCol + 1]);
    this.cells.push(allCells[startRow + 2][startCol + 2]);
  };

  private getUniqueCandidatesForBlock = () => {
    const startRow = this.getBlockStartRow();
    const startCol = this.getBlockStartColumn();
    for (let row = startRow; row < startRow + 3; row++) {
      // get unique candidates for this row of the block
      for (let column = startCol; column < startCol + 3; column++) {
        const cell: Cell = allCells[row][column];
        addNumberstoUniqueArray(this.uniqueCandidatesForBlock, cell.candidates);
      }
    }
  };

  constructor(blockIndex: indexType) {
    this.blockIndex = blockIndex;
    this.startRowIndex = this.getBlockStartRow();
    this.startColumnIndex = this.getBlockStartColumn();
    this.getBlockOfCells();
    this.getUniqueCandidatesForBlock();
  }
}
