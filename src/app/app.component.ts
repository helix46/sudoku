import { Component } from '@angular/core';

export interface StructCell {
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
}
