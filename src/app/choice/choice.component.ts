import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StructCellModal } from '../cell/cell.component';
import { digitType } from '../definitions';
import { Cell } from '../cell/cell';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceComponent implements OnInit {
  //data!: StructCell;
  data!: StructCellModal;

  clicked = (index: number) => {
    const num: digitType = index.toString() as digitType;
    if (this.data.isLarge) {
      this.data.cell.digit = num;
      this.data.cell.candidates = [num];
      this.matDialogRef.close(this.data.cell);
    } else {
      this.addNumberToCandidates(num);
    }
  };

  addNumberToCandidates = (num: digitType) => {
    const filtered = this.data.cell.candidates.filter((n) => {
      return n === num;
    });

    // if number already there remove it, else add it
    if (filtered.length) {
      const temp: digitType[] = [];
      this.data.cell.candidates.forEach((n) => {
        if (n !== num) {
          temp.push(n);
        }
      });
      this.data.cell.candidates = temp;
    } else {
      this.data.cell.candidates.push(num);
      this.data.cell.candidates.sort();
    }
  };

  constructor(private matDialogRef: MatDialogRef<ChoiceComponent, Cell>) {}

  ngOnInit(): void {}
}
