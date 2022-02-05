import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { ModalContainerDirective } from './modal-container.directive';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalContainerItem {
  component: Type<Component>;
  data: {} | null;
}

@Component({
  selector: 'lib-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ModalContainerDirective, { static: true })
  modalContainerDirective!: ModalContainerDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) private modalContainerItem: ModalContainerItem
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  ngOnDestroy(): void {}

  loadComponent(): void {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modalContainerItem.component);

    const viewContainerRef = this.modalContainerDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.modalContainerItem.component
    );
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    if (this.modalContainerItem.data) {
      (componentRef.instance as ModalContainerItem).data =
        this.modalContainerItem.data;
    }
  }
}
