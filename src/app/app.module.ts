import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CellModule } from './cell/cell.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalContainerModule } from './modal-container/modal-container.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CellModule,
    BrowserAnimationsModule,
    ModalContainerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
