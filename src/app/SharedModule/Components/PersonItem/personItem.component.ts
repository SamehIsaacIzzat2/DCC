import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PersonItemModel } from './personItemModel';
import { IPerson } from './iPerson';

@Component({
  selector: 'person-item',
  templateUrl: 'personItem.component.html',
  styleUrls: ['personItem.component.scss'],
  providers: [PersonItemModel]
})

export class PersonItemComponent {

  @Input() public set item(item: IPerson) {
    this.model.data = item;
  }
  @Input() public set backgroundColor(value: string) {
    this.model.data.backgroundColor = value;
  }
  @Input() public set highlightedText(value: string) {
    this.model.highlightedText = value;
  }
  @Output() public onClick: EventEmitter<IPerson> = new EventEmitter<IPerson>();

  constructor(public model: PersonItemModel) {
    this.model.onClick.subscribe(item => this.onClick.emit(item));
  }

}
