import { ModalContainerComponent } from './modal-container.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalContainerDirective } from './modal-container.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalContainerComponent, ModalContainerDirective],
  entryComponents: [ModalContainerComponent],
  exports: [ModalContainerComponent, ModalContainerDirective],
})
export class ModalContainerModule {
  constructor() {}
}
