import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChoiceModule } from '../choice/choice.module';

@NgModule({
  declarations: [CellComponent],
  imports: [CommonModule, MatDialogModule, ChoiceModule],
  exports: [CellComponent],
})
export class CellModule {}
