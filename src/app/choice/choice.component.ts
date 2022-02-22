import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StructCellModal } from '../cell/cell.component';
import { digitType, StructCell } from '../definitions';

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
      this.data.structCell.digit = num;
      this.data.structCell.candidates = [num];
      this.matDialogRef.close(this.data.structCell);
    } else {
      this.addNumberToCandidates(num);
    }
  };

  addNumberToCandidates = (num: digitType) => {
    const filtered = this.data.structCell.candidates.filter((n) => {
      return n === num;
    });

    // if number already there remove it, else add it
    if (filtered.length) {
      const temp: digitType[] = [];
      this.data.structCell.candidates.forEach((n) => {
        if (n !== num) {
          temp.push(n);
        }
      });
      this.data.structCell.candidates = temp;
    } else {
      this.data.structCell.candidates.push(num);
      this.data.structCell.candidates.sort();
    }
  };

  constructor(
    private matDialogRef: MatDialogRef<ChoiceComponent, StructCell>
  ) {}

  ngOnInit(): void {}
}
