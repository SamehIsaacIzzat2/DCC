import { ModalMode, SidebarModalMode } from './enums';
import { IModal } from './iModal';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ModalModel {

  //========================Data====================
  public data: IModal = {} as IModal;
  public mode: ModalMode = ModalMode.Confirmation;
  public sidebarMode: SidebarModalMode = SidebarModalMode.Full;
  // public title: string;

  //======================Events====================
  public onSave: EventEmitter<any> = new EventEmitter<any>();
  public onClose: EventEmitter<void> = new EventEmitter<void>();

  //====================Constructor=================
  constructor() {  }

  //====================Logic=======================

  // Check if Confirmation Mode
  public get ConfirmationMode() {
    return this.mode == ModalMode.Confirmation;
  }

  // Check if Action Mode
  public get ActionMode() {
    return this.mode == ModalMode.Action;
  }

   // Check if Sidebar Mode
   public get SidebarMode() {
    return this.mode == ModalMode.Sidebar;
  }

  // Check if Sidebar Full Mode
  public get SidebarFullMode() {
    return this.mode == ModalMode.Sidebar && this.sidebarMode == SidebarModalMode.Full;
  }

  // Check if Sidebar Curve Mode
  public get SidebarCurveMode() {
    return this.mode == ModalMode.Sidebar && this.sidebarMode == SidebarModalMode.Curve;
  }

  // Save
  public save() {
    this.onSave.emit();
  }

  // Close
  public close() {
    this.onClose.emit();
  }
  
}
