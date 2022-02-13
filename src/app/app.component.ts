import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AppService } from './app.service';
import { ImportGameService } from './import-game.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { UtilitiesService } from './utilities.service';

export interface StructCell {
  row: number;
  column: number;
  given: boolean;
  large: number | null;
  possibles: number[];
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
    this.utilitiesService.getArray().forEach((row) => {
      this.utilitiesService.getArray().forEach((column) => {
        this.cells[row][column].focussed = false;
      });
    });
  };

  enterGiven = (matCheckboxChange: MatCheckboxChange) => {
    this.cellsEnteredAreGiven = matCheckboxChange.checked;
  };

  constructor(
    public appService: AppService,
    public importGameService: ImportGameService,
    public pairsOfPairsService: PairsOfPairsService,
    private utilitiesService: UtilitiesService
  ) {
    appService.initialiseCells(this.cells);
  }
}
