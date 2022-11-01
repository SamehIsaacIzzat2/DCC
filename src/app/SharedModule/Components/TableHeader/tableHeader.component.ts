import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeaderModel } from './tableHeaderModel';
import { ITableHeader, ITabItem } from './iTableHeader';

@Component({
  selector: 'table-header',
  templateUrl: 'tableHeader.component.html',
  styleUrls: ['tableHeader.component.scss'],
  providers: [TableHeaderModel]
})

export class TableHeaderComponent {

  @Input() public set data(data: ITableHeader) {
    this.model.data = data;
  }

  @Output() public onToggleColumnSettings: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onRefresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onExport: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onTabItemClick: EventEmitter<ITabItem> = new EventEmitter<ITabItem>();

  constructor(public model: TableHeaderModel) {
    this.model.onToggleColumnSettings.subscribe(() => this.onToggleColumnSettings.emit());
    this.model.onRefresh.subscribe(() => this.onRefresh.emit());
    this.model.onExport.subscribe(() => this.onExport.emit());
    this.model.onTabItemClick.subscribe(item => this.onTabItemClick.emit(item));
    this.model.onAdd.subscribe(() => this.onAdd.emit());
  }

}
