import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AppService } from './app.service';
import { ImportGameService } from './import-game.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { Cell } from './cell/cell';
import { allCells, getIndexArray } from './utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sudoku';
  cellsEnteredAreGiven = false;
  allCells!: Cell[][];

  clearFocus = () => {
    getIndexArray().forEach((row) => {
      getIndexArray().forEach((column) => {
        allCells[row][column].focussed = false;
      });
    });
  };

  enterGiven = (matCheckboxChange: MatCheckboxChange) => {
    this.cellsEnteredAreGiven = matCheckboxChange.checked;
  };

  constructor(
    public appService: AppService,
    public importGameService: ImportGameService,
    public pairsOfPairsService: PairsOfPairsService
  ) {
    this.allCells = allCells;
    appService.initialiseCells();
  }
}
