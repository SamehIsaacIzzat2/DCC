import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnSettingsModel } from './columnSettings.model';

@Component({
  selector: 'column-settings',
  templateUrl: 'columnSettings.component.html',
  styleUrls: ['columnSettings.component.scss'],
  providers: [ColumnSettingsModel]
})

export class ColumnSettingsComponent {

    @Input() public set items(items: Array<any>) {
      this.model.items = items;
      this.model.checkedColumnsCount = this.model.items.length;
    }

    @Output() public onChangeItem: EventEmitter<any> = new EventEmitter<any>();

    constructor(public model: ColumnSettingsModel) {
      this.model.onChangeItem.subscribe((data) => this.onChangeItem.emit(data));
    }

}