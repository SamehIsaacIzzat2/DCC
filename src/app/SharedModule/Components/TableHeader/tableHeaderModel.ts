import { EventEmitter, Injectable } from '@angular/core';
import { ITableHeader, ITabItem } from './iTableHeader';

@Injectable()
export class TableHeaderModel {

  // ===================== Data ====================
  public data: ITableHeader = {} as ITableHeader;
  public isAddClicked: boolean = false;
  public columnSettingsOpened: boolean = false;

  // ===================== Events ==================
  public onToggleColumnSettings: EventEmitter<string> = new EventEmitter<string>();
  public onRefresh: EventEmitter<string> = new EventEmitter<string>();
  public onExport: EventEmitter<string> = new EventEmitter<string>();
  public onAdd: EventEmitter<void> = new EventEmitter<void>();
  public onTabItemClick: EventEmitter<ITabItem> = new EventEmitter<ITabItem>();

  // ================= constructor =================
  constructor() {}

  // ================= Logic =================

  public get Records() {
    if(this.data.records ==0 )
      return  this.data.title;
    else 
      return this.data.records + " " + this.data.title;
  }

  // toggle Column Settings
  public toggleColumnSettings() {
    this.onToggleColumnSettings.emit();
    this.columnSettingsOpened = !this.columnSettingsOpened;
  }

  // Do Action
  public add() {
    this.isAddClicked = true;
    this.onAdd.emit();
  }

  // tabItemClicked
  public tabItemClicked(item:ITabItem) {
    this.onTabItemClick.emit(item);
  }

  // Show Column Settings
  public get ShowColumnSettings() {
    return this.data.hasColumnSettings;
  }

  // Show Refresh
  public get ShowRefresh() {
    return this.data.hasRefresh;
  }

  // Refresh
  public refresh() {
    this.onRefresh.emit();
  }

  // Show Export
  public get ShowExport() {
    return this.data.hasExport;
  }

  // Export
  public export() {
    this.onExport.emit();
  }

}
