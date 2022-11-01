import { Component, Input, EventEmitter, Output } from '@angular/core';
import { rowWidget } from './rowWidget.interface';
import { RowWidgetModel } from './rowWidget.model';

@Component({
  selector: 'row-widget',
  templateUrl: 'rowWidget.component.html',
  styleUrls: ['rowWidget.component.scss'],
  providers: [RowWidgetModel]
})

export class RowWidgetComponent {
  @Input() item: rowWidget;
  constructor(public model: RowWidgetModel) { }
}
