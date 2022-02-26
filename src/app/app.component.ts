import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AppService } from './app.service';
import { ImportGameService } from './import-game.service';
import { PairsOfPairsService } from './pairs-of-pairs.service';
import { Cell } from './cell/cell';
import { allCells, getIndexArray } from './utilities.service';
import { digitType } from './definitions';

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

  getCombinations = (array: digitType[], combinationLength: number) => {
    function fork(index: number, combination: digitType[]) {
      if (index === array.length) {
        if (combination.length === combinationLength) {
          result.push(combination);
        }
        return;
      }
      fork(index + 1, combination.concat([array[index]]));
      fork(index + 1, combination);
    }

    const result: digitType[][] = [];
    fork(0, []);
    return result;
  };

  constructor(
    public appService: AppService,
    public importGameService: ImportGameService,
    public pairsOfPairsService: PairsOfPairsService
  ) {
    //  console.log(this.getAllSubsets([1, 2, 3, 4, 5, 6, 7, 8]));
    const data: digitType[] = ['1', '2', '3', '4', '5', '6'];
    const result = this.getCombinations(data, 3);
    console.log(result);
    this.allCells = allCells;
    appService.initialiseCells();
  }
}
