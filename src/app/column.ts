import { indexType } from './definitions';
import { Cell } from './cell/cell';
import { allCells } from './utilities.service';
import { Block } from './block';

export class Column {
  readonly columnIndex: indexType;
  readonly cells: Cell[];
  intersectingBlocks: Block[];

  constructor(columnIndex: indexType) {
    this.columnIndex = columnIndex;
    this.cells = [];
    allCells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.columnIndex === columnIndex) {
          this.cells.push(cell);
        }
      });
    });

    this.intersectingBlocks = [];
    switch (columnIndex) {
      case 0:
      case 1:
      case 2:
        this.intersectingBlocks.push(new Block(0));
        this.intersectingBlocks.push(new Block(3));
        this.intersectingBlocks.push(new Block(6));
        break;
      case 3:
      case 4:
      case 5:
        this.intersectingBlocks.push(new Block(1));
        this.intersectingBlocks.push(new Block(4));
        this.intersectingBlocks.push(new Block(7));
        break;
      case 6:
      case 7:
      case 8:
        this.intersectingBlocks.push(new Block(2));
        this.intersectingBlocks.push(new Block(5));
        this.intersectingBlocks.push(new Block(8));
        break;
    }
  }
}
