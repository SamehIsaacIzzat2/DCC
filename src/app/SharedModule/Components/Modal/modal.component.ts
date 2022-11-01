import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalMode } from './enums';
import { IModal } from './iModal';
import { ModalModel } from './modal.model';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild('sidebarContent', { read: ViewContainerRef }) sidebarContent: ViewContainerRef;
  @ViewChild('inputsContent', { read: ViewContainerRef }) inputsContent: ViewContainerRef;

  public componentRef: ComponentRef<any>;
  public sidebarComponentRef: ComponentRef<any>;

  @Input() public set data(data: IModal) {
    if (data) this.model.data = data;
  }
  @Input() public set title(title: string) {
    if (title) this.model.data.title = title;
  }
  @Input() public set mode(mode: ModalMode) {
    if (mode) this.model.mode = mode;
  }
  @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();

  //==================Constructor===============
  constructor( private cdRef: ChangeDetectorRef, public model: ModalModel, private resolver: ComponentFactoryResolver, @Inject(MAT_DIALOG_DATA) public compData: any ) {
    this.model.onSave.subscribe((data) => this.onSave.emit(data));
    this.model.onClose.subscribe(() => this.onClose.emit());
  }

  ngOnInit() {
    this.cdRef.detectChanges();
    console.log(this.mode)
    if(this.model.ActionMode) {
      const factory = this.resolver.resolveComponentFactory(this.compData.component);
      this.componentRef = this.inputsContent.createComponent(factory);
      let instance = this.componentRef.instance;
      instance.data = this.compData.data;
      instance.onSave.subscribe((data: any) => this.model.onSave.emit(data));
      instance.onClose.subscribe(() => this.model.onClose.emit());
    }

    if(this.model.SidebarMode) {
      const factory = this.resolver.resolveComponentFactory(this.compData.component);
      this.sidebarComponentRef = this.sidebarContent.createComponent(factory);
      let sidebarInstance = this.sidebarComponentRef.instance;
      sidebarInstance.onSave.subscribe((data: any) => this.model.onSave.emit(data));
      sidebarInstance.onClose.subscribe(() => this.model.onClose.emit());
    }
  }

  ngOnDestroy() {
   //this.componentRef.destroy();
    //this.sidebarComponentRef.destroy();
   // console.log("this.sidebarComponentRef closed from destroy", this.sidebarComponentRef);
    //console.log("this.sidebarInstance closed from destroy", this.sidebarInstance);
    //this.sidebarInstance.close();
  }

}
