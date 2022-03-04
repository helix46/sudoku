import { indexType } from './definitions';
import { Cell } from './cell/cell';
import { allCells } from './utilities.service';

export class Row {
  readonly rowIndex: indexType;
  readonly cells: Cell[];

  constructor(rowIndex: indexType) {
    this.rowIndex = rowIndex;
    this.cells = [];
    allCells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.rowIndex === rowIndex) {
          this.cells.push(cell);
        }
      });
    });
  }
}
