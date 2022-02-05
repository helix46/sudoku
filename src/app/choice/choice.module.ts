import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceComponent } from './choice.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ChoiceComponent],
  imports: [CommonModule, MatCardModule],
})
export class ChoiceModule {}
