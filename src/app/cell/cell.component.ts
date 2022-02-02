import { Component, Input, OnInit } from '@angular/core';
import { StructCell } from '../app.component';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  constructor() {}
  @Input() structCell!: StructCell;
  ngOnInit(): void {}
}
