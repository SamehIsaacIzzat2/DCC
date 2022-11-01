import { EventEmitter, Injectable } from "@angular/core";
import { WidgetMode } from "./enums";
import { IWidget } from "./iWidget";

@Injectable()
export class WidgetModel {

  //====================Data===============
  public data: IWidget = {} as IWidget;
  public isSelectedTag: boolean = false;

  //===================Events===============
  public onClick: EventEmitter<IWidget> = new EventEmitter<IWidget>();
  // public onEdit: EventEmitter<IWidget> = new EventEmitter<IWidget>();
  // public onDelete: EventEmitter<IWidget> = new EventEmitter<IWidget>();

  // Check Item Action Mode 
  public get AllowShowItemWidget() {
    return (this.data.mode == WidgetMode.ActionItem || this.data.mode == WidgetMode.ViewItem) && this.data.isVisible;
  }

  // Check Block Action Mode 
  public get AllowShowBlockWidgetMode() {
    return this.data.mode == WidgetMode.Block && this.data.isVisible;
  }

  // Allow Show Tag Mode
  public get AllowShowTagWidget() {
    return this.data.mode == WidgetMode.Tag && this.data.isVisible;
  }

  // Allow Show Actions
  public get AllowShowActions() {
    return this.data.mode == WidgetMode.ViewItem;
  }

  // Click
  public click(widget: any) {
    this.onClick.emit(widget);
  }

  // Allow Show Check Icon
  public get AllowShowCheckIcon() {
    return this.AllowShowTagWidget || this.data.mode == WidgetMode.ViewItem;
  }

  // Check Icon Text
  public get CheckIconText() {
    return this.data.isSelectable ? "check_circle" : "check_circle_outline";
  }

  // Check Icon Style
  public get CheckIconStyle() {
    return this.data.isSelectable ? "selected" : "unselected";
  }

  // Edit
  // public edit(widget: any) {
  //   this.onEdit.emit(widget);
  // }

  // // Delete
  // public delete(widget: any) {
  //   this.onDelete.emit(widget);
  // }

}
