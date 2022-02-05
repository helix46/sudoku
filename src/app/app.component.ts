import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

export interface StructCell {
  row: number;
  column: number;
  given: boolean;
  isLarge: boolean;
  large: number;
  smalls: number[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sudoku';
  formGroup!: FormGroup;
  cellFormControls!: FormControl<StructCell>[][];

  constructor() {
    for (let row = 0; row < 10; row++) {
      const columns: FormControl<StructCell>[] = [];
      for (let column = 0; column < 10; column++) {
        const formControl: FormControl<StructCell> =
          new FormControl<StructCell>({
            given: false,
            column,
            row,
            large: 0,
            isLarge: true,
            smalls: [],
          });
      }
    }
  }
}
