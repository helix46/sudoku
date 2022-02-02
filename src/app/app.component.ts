import { Component } from '@angular/core';

export interface StructCell {
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
