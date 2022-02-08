import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StructCell } from '../app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { StructCellModal } from '../cell/cell.component';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceComponent implements OnInit {
  data!: StructCellModal;

  clicked = (num: number) => {
    if (this.data.isLarge) {
      this.data.structCell.large = num;
      this.matDialogRef.close(this.data.structCell);
    } else {
      this.addNumberToSmalls(num);
    }
  };

  addNumberToSmalls = (num: number) => {
    const filtered = this.data.structCell.smalls.filter((n) => {
      return n === num;
    });

    // if number already there remove it, else add it
    if (filtered.length) {
      const temp: number[] = [];
      this.data.structCell.smalls.forEach((n) => {
        if (n !== num) {
          temp.push(n);
        }
      });
      this.data.structCell.smalls = temp;
    } else {
      this.data.structCell.smalls.push(num);
      this.data.structCell.smalls.sort();
    }
  };

  constructor(
    private matDialogRef: MatDialogRef<ChoiceComponent, StructCell>
  ) {}

  ngOnInit(): void {}
}
