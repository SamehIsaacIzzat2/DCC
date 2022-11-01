import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WidgetModel } from './widget.model';
import { IWidget } from './iWidget';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  providers: [WidgetModel]
})

export class WidgetComponent {

  @Input() public set data(data: IWidget) {
    if(data)
      this.model.data = data;
  }
  @Output() public onClick: EventEmitter<IWidget> = new EventEmitter<IWidget>();
  // @Output() public onEdit: EventEmitter<IWidget> = new EventEmitter<IWidget>();
  // @Output() public onDelete: EventEmitter<IWidget> = new EventEmitter<IWidget>();

  constructor(public model: WidgetModel) {
    this.model.onClick.subscribe( (data) => this.onClick.emit(data) );
    // this.model.onEdit.subscribe( (data) => this.onEdit.emit(data) );
    // this.model.onDelete.subscribe( (data) => this.onDelete.emit(data) );
  }

}
