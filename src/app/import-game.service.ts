import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ImportGameService {
  importHardGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [1, 0, 2],
      [2, 0, 3],
      [6, 0, 8],
      [2, 1, 0],
      [1, 1, 4],
      [5, 1, 6],
      [4, 1, 8],
      [9, 2, 1],
      [5, 2, 3],
      [6, 2, 5],
      [2, 3, 2],
      [3, 3, 6],
      [7, 4, 1],
      [1, 4, 3],
      [8, 4, 5],
      [5, 5, 2],
      [6, 5, 6],
      [5, 6, 1],
      [4, 6, 3],
      [1, 6, 5],
      [6, 7, 0],
      [8, 7, 4],
      [1, 7, 6],
      [5, 7, 8],
      [7, 8, 2],
      [6, 8, 3],
      [2, 8, 8],
    ];
    this.appService.initialiseCells(cells);

    game.forEach((index) => {
      cells[index[1]][index[2]].large = index[0];
      cells[index[1]][index[2]].given = true;
    });
    this.appService.processCells(cells);
  };

  importEasyGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [2, 0, 0],
      [4, 0, 1],
      [7, 0, 3],
      [6, 0, 4],
      [8, 0, 8],
      [7, 1, 1],
      [9, 1, 5],
      [2, 1, 7],
      [6, 1, 8],
      [2, 2, 5],
      [9, 3, 1],
      [7, 3, 2],
      [4, 3, 8],
      [3, 4, 0],
      [1, 4, 8],
      [1, 5, 0],
      [6, 5, 6],
      [3, 5, 7],
      [1, 6, 3],
      [9, 7, 0],
      [3, 7, 1],
      [8, 7, 3],
      [6, 7, 7],
      [4, 8, 0],
      [7, 8, 4],
      [5, 8, 5],
      [9, 8, 7],
      [3, 8, 8],
    ];
    this.appService.initialiseCells(cells);
    game.forEach((index) => {
      cells[index[1]][index[2]].large = index[0];
      cells[index[1]][index[2]].given = true;
    });
    this.appService.processCells(cells);
  };

  importAnotherHardGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [7, 0, 1],
      [5, 0, 3],
      [8, 0, 4],
      [4, 0, 6],
      [2, 0, 7],
      [6, 0, 8],
      [3, 1, 5],
      [1, 1, 6],
      [4, 2, 3],
      [3, 2, 7],
      [8, 2, 8],
      [9, 3, 1],
      [4, 3, 4],
      [5, 3, 8],
      [5, 4, 1],
      [1, 4, 2],
      [2, 4, 6],
      [9, 4, 7],
      [6, 5, 0],
      [9, 5, 4],
      [5, 5, 5],
      [8, 5, 7],
      [7, 6, 0],
      [6, 6, 1],
      [4, 6, 5],
      [4, 7, 2],
      [9, 7, 3],
      [9, 8, 0],
      [1, 8, 4],
      [8, 8, 5],
      [4, 8, 7],
    ];
    this.appService.initialiseCells(cells);

    game.forEach((index) => {
      cells[index[1]][index[2]].large = index[0];
      cells[index[1]][index[2]].given = true;
    });
    this.appService.processCells(cells);
  };

  constructor(private appService: AppService) {}
}
