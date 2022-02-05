import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libModalContainerHost]',
})
export class ModalContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
