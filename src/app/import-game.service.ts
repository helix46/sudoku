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

    game.forEach((given) => {
      cells[given[1]][given[2]].large = given[0];
      cells[given[1]][given[2]].given = true;
    });
    this.appService.findPossibles(cells);
  };

  importEasyGame = (cells: StructCell[][]) => {
    const game: number[][] = [
      [4, 0, 0],
      [5, 0, 3],
      [3, 0, 4],
      [7, 0, 5],
      [2, 0, 8],
      [5, 1, 2],
      [9, 1, 6],
      [8, 2, 2],
      [1, 2, 3],
      [2, 2, 5],
      [6, 2, 6],
      [5, 4, 0],
      [4, 4, 1],
      [9, 4, 3],
      [3, 4, 5],
      [2, 4, 7],
      [8, 4, 8],
      [7, 5, 0],
      [9, 5, 1],
      [8, 5, 3],
      [6, 5, 5],
      [3, 5, 7],
      [5, 5, 8],
      [1, 6, 4],
      [8, 7, 1],
      [2, 7, 3],
      [4, 7, 5],
      [9, 7, 7],
    ];
    this.appService.initialiseCells(cells);
    game.forEach((given) => {
      cells[given[1]][given[2]].large = given[0];
      cells[given[1]][given[2]].given = true;
    });
    this.appService.findPossibles(cells);
  };

  constructor(private appService: AppService) {}
}