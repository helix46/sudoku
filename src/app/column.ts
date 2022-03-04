import { indexType } from './definitions';
import { Cell } from './cell/cell';
import { allCells } from './utilities.service';

export class Column {
  readonly columnIndex: indexType;
  readonly cells: Cell[];
  intersectingBlocks: indexType[];

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
  }
}
