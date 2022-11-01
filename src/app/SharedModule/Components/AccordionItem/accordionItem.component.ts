import { Component, Input } from '@angular/core';
import { accItem } from './accordionItem.interface';
import { AccordionItemModel } from './accordionItem.model';

@Component({
  selector: 'accordion-item',
  templateUrl: 'accordionItem.component.html',
  styleUrls: ['accordionItem.component.scss'],
  providers: [AccordionItemModel]
})

export class AccordionItemComponent {
  @Input() item: accItem;
  constructor(public model: AccordionItemModel) { }
}
