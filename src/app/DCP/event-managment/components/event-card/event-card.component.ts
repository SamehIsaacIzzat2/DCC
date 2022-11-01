import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { EventData } from '../event-list/event-data';
import { EventActionServiceService } from './event-action-service.service';
import { EventCardModel } from './event-card.model';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  providers:[EventCardModel]
})
export class EventCardComponent implements OnInit,OnChanges {
  @Output() changeState = new EventEmitter()
  @Input() item:EventData;
  constructor(public model:EventCardModel) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.model.changeStateEvent = this.changeState
    this.model.item = this.item;
  }

  ngOnInit(): void {
    if(this.item.compositeAddress)
      this.item.compositeAddress = this.item.compositeAddress.trim(); 
  }



}
