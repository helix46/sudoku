import { indexType } from './definitions';
import { Cell } from './cell/cell';
import { Row } from './row';
import { Block } from './block';
import { Column } from './column';

export class Intersection {
  partialHouse1: Cell[] = [];
  partialHouse2: Cell[] = [];
  intersectingCells: Cell[] = [];

  constructor(house: Row | Column, isRow: boolean, block: Block) {
    house.cells.forEach((cell) => {
      if (cell.existsIn(block.cells)) {
        this.intersectingCells.push(cell);
      } else {
        this.partialHouse1.push(cell);
      }
    });
    block.cells.forEach((cell) => {
      if (!cell.existsIn(house.cells)) {
        this.partialHouse2.push(cell);
      }
    });
  }
}
