import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AppService } from './app.service';

export interface StructCell {
  row: number;
  column: number;
  given: boolean;
  // isLarge: boolean;
  large: number | null;
  smalls: number[];
  focussed: boolean;
  error: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sudoku';
  cells: StructCell[][] = [];
  cellsEnteredAreGiven = false;

  clearFocus = () => {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        this.cells[row][column].focussed = false;
      }
    }
  };

  enterGiven = (matCheckboxChange: MatCheckboxChange) => {
    this.cellsEnteredAreGiven = matCheckboxChange.checked;
  };

  constructor(public appService: AppService) {
    appService.initialiseCells(this.cells);
  }
}
