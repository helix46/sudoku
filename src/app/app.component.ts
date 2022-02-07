import { Component } from '@angular/core';

export interface StructCell {
  row: number;
  column: number;
  given: boolean;
  isLarge: boolean;
  large: number | null;
  smalls: number[];
  focussed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sudoku';
  cells: StructCell[][] = [];

  initialiseRow = (row: number): StructCell[] => {
    const rowOfCells: StructCell[] = [];
    for (let column = 0; column < 10; column++) {
      const structCell: StructCell = {
        given: false,
        column,
        row,
        large: null,
        isLarge: true,
        smalls: [],
        focussed: false,
      };
      rowOfCells.push(structCell);
    }
    return rowOfCells;
  };

  constructor() {
    for (let row = 0; row < 10; row++) {
      const columns: StructCell[] = this.initialiseRow(row);
      this.cells.push(columns);
    }
  }
}
