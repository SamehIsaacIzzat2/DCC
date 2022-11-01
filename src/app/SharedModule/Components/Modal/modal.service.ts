import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { ModalMode, SidebarModalMode } from './enums';
import { IModal } from './iModal';
import { Subscription } from 'rxjs';

@Injectable()
export class ModalService {
  //============Data=============
  public componentInstance: any;

  //=========Constructor=========
  constructor(private dialog: MatDialog) {}

  //=======Services ==============

  // Confirm
  public confirm(modal: any, onSave: () => any) {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '390px',
      minHeight: '290px',
    });

    let instance = dialogRef.componentInstance as ModalComponent;

    instance.mode = ModalMode.Confirmation;
    instance.data = {
      icon: modal.icon ? modal.icon : '',
      title: modal.title ? modal.title : 'title',
      text: modal.text ? modal.text : `text`,
      primaryActionText: modal.primaryActionText
        ? modal.primaryActionText
        : 'Yes',
      secondaryActionText: modal.secondaryActionText
        ? modal.secondaryActionText
        : 'No',
    } as any;

    // Subscribe save
    let confirmSubs: Subscription = instance.onSave.subscribe(() => {
      onSave();
      dialogRef.close();
    });

    // Subscribe close
    let cancelSubs: Subscription = instance.onClose.subscribe(() => {
      dialogRef.close();
    });

    // Unsubscribe Events After dialoge Close
    dialogRef.afterClosed().subscribe(() => {
      if (cancelSubs) cancelSubs.unsubscribe();
      if (confirmSubs) confirmSubs.unsubscribe();
    });
  }

  // Open Sidebar
  public openSidebar(
    component: any,
    onSave: (data: any) => any,
    width?: string
  ) {
    this.dialog.closeAll();

    let compInstance = new component();

    let dialogRef = this.dialog.open(ModalComponent, {
      minWidth: width ? width : '500px',
      minHeight: '100vh',
      panelClass: 'sidebarModal',
      data: {
        component: component,
      },
    });

    let instance = dialogRef.componentInstance as ModalComponent;

    instance.mode = ModalMode.Sidebar;
    instance.model.sidebarMode = SidebarModalMode.Curve;
    instance.data = {
      title: compInstance.title,
    } as IModal;

    // Subscribe save
    let confirmSubs: Subscription = instance.onSave.subscribe((data) => {
      onSave(data);
      dialogRef.close();
    });

    // Subscribe close
    let cancelSubs: Subscription = instance.onClose.subscribe(() => {
      dialogRef.close();
    });

    // Unsubscribe Events After dialoge Close
    dialogRef.afterClosed().subscribe(() => {
      if (cancelSubs) cancelSubs.unsubscribe();
      if (confirmSubs) confirmSubs.unsubscribe();
    });
  }

   // Open Sidebar
   public openEditSidebar(
    component: any,
    data: any,
    title: string,
    onSave: (data: any) => any,
    width?: string
  ) {
    this.dialog.closeAll();

    let compInstance = new component();

    let dialogRef = this.dialog.open(ModalComponent, {
      minWidth: width ? width : '500px',
      minHeight: '100vh',
      panelClass: 'sidebarModal',
      data: {
        component: component,
        data: data,
      },
    });

    let instance = dialogRef.componentInstance as ModalComponent;

    instance.mode = ModalMode.Sidebar;
    instance.model.sidebarMode = SidebarModalMode.Curve;
    instance.data = {
      title: title,
    } as IModal;

    // Subscribe save
    let confirmSubs: Subscription = instance.onSave.subscribe((data) => {
      onSave(data);
      dialogRef.close();
    });

    // Subscribe close
    let cancelSubs: Subscription = instance.onClose.subscribe(() => {
      dialogRef.close();
    });

    // Unsubscribe Events After dialoge Close
    dialogRef.afterClosed().subscribe(() => {
      if (cancelSubs) cancelSubs.unsubscribe();
      if (confirmSubs) confirmSubs.unsubscribe();
    });
  }

  // Open Component
  public openComponent(
    component: any,
    minHeight: string = '300px',
    onSave: (data: any) => any
  ) {
    let compInstance = new component();
    let dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '450px',
      minHeight: minHeight,
      data: {
        component: component,
      },
    });

    let instance = dialogRef.componentInstance as ModalComponent;
    instance.mode = ModalMode.Action;
    instance.data = {
      title: compInstance.title,
    } as IModal;

    // Subscribe save
    let confirmSubs: Subscription = instance.onSave.subscribe((data) => {
      onSave(data);
      dialogRef.close();
    });

    // Subscribe close
    let cancelSubs: Subscription = instance.onClose.subscribe(() => {
      dialogRef.close();
    });

    // Unsubscribe Events After dialoge Close
    dialogRef.afterClosed().subscribe(() => {
      if (cancelSubs) cancelSubs.unsubscribe();
      if (confirmSubs) confirmSubs.unsubscribe();
    });
  }

  public openEditComponent(
    component: any,
    data: any,
    title: string,
    minWidth: string = '450px',
    minHeight: string = '300px',
    onSave: (data: any) => any
  ) {
    let compInstance = new component();
    let dialogRef = this.dialog.open(ModalComponent, {
      minWidth: minWidth,
      minHeight: minHeight,
      data: {
        component: component,
        data: data,
      },
    });

    let instance = dialogRef.componentInstance as ModalComponent;
    instance.mode = ModalMode.Action;
    instance.data = {
      title: title,
    } as IModal;

    // Subscribe save
    let confirmSubs: Subscription = instance.onSave.subscribe((data) => {
      onSave(data);
      dialogRef.close();
    });

    // Subscribe close
    let cancelSubs: Subscription = instance.onClose.subscribe(() => {
      dialogRef.close();
    });

    // Unsubscribe Events After dialoge Close
    dialogRef.afterClosed().subscribe(() => {
      if (cancelSubs) cancelSubs.unsubscribe();
      if (confirmSubs) confirmSubs.unsubscribe();
    });
  }
}
