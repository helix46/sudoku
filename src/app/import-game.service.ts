import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { digitType } from './definitions';
import { allCells } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ImportGameService {
  importHardGame = () => {
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
    this.importGame(game);
  };

  importEasyGame = () => {
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
    this.importGame(game);
  };

  importAnotherHardGame = () => {
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
    this.importGame(game);
  };
  importVeryHardGame = () => {
    const game: number[][] = [
      [2, 0, 3],
      [8, 0, 8],
      [5, 1, 1],
      [4, 1, 8],
      [7, 2, 1],
      [3, 2, 4],
      [1, 2, 6],
      [8, 3, 1],
      [2, 3, 5],
      [7, 3, 8],
      [7, 4, 0],
      [5, 4, 3],
      [9, 4, 4],
      [1, 4, 5],
      [2, 4, 8],
      [4, 5, 0],
      [3, 5, 3],
      [5, 5, 7],
      [5, 6, 2],
      [1, 6, 4],
      [7, 6, 7],
      [9, 7, 0],
      [6, 7, 7],
      [3, 8, 0],
      [8, 8, 5],
    ];
    this.importGame(game);
  };

  importGame = (game: number[][]) => {
    this.appService.initialiseCells();
    game.forEach((index) => {
      allCells[index[1]][index[2]].digit = index[0].toString() as digitType;
      allCells[index[1]][index[2]].given = true;
    });
    this.appService.processCells(true);
  };

  constructor(private appService: AppService) {}
}
