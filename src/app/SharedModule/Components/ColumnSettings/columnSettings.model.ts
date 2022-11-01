import { EventEmitter, Injectable } from '@angular/core';
import { ITableFilterOption } from '../../Interfaces/ITableFilterOption.interface';

@Injectable()
export class ColumnSettingsModel {
  //=========================Data=======================
  public items: Array<any> = new Array<any>();
  public checkedColumnsCount: number = 0;

  //=======================Events=======================
  public onChangeItem: EventEmitter<any> = new EventEmitter<any>();

  //======================Constructor===================
  constructor() {}

  //=======================Logic========================

  // Change Item
  public changeItem(event: any, item: string) {
    const params: ITableFilterOption = {
      item: item,
      checked: event.checked,
    };
    this.onChangeItem.emit(params);
    if (params.checked) this.checkedColumnsCount++;
    else this.checkedColumnsCount--;
  }

  // Get Checked Columns Count
  public get CheckedColumnsCount() {
    return this.checkedColumnsCount;
  }
}
