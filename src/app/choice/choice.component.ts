import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StructCell } from '../app.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceComponent implements OnInit {
  data!: StructCell;

  clicked = (num: number) => {
    this.data.large = num;
    this.matDialogRef.close(this.data);
  };

  constructor(private matDialogRef: MatDialogRef<ChoiceComponent>) {}

  ngOnInit(): void {}
}
