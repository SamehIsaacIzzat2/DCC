import { Component, Input } from '@angular/core';
import { CardWidgetModel } from './cardWidget.model';
import { serviceCard } from './serCard.interface';

@Component({
  selector: 'card-widget',
  templateUrl: 'cardWidget.component.html',
  styleUrls: ['cardWidget.component.scss'],
  providers: [CardWidgetModel]
})

export class CardWidgetComponent {
  @Input() service: serviceCard;
  constructor(public model: CardWidgetModel) { }
}
