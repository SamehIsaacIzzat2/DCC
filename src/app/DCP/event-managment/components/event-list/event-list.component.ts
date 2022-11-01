import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventList } from '../../pages/list-events-page/event-list-model';
import { EventData } from './event-data';
import { EventComponentList } from './event-list.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  providers: [EventComponentList],
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() items: EventData[] = [];
  @Input() loading: boolean = true;
  @Output() chnageStateEvent = new EventEmitter();
  constructor(public model: EventComponentList) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.model.rowData = this.items;
  }

  changesState(evt: any) {
    this.chnageStateEvent.emit(evt);
  }

  ngOnInit(): void {}
}
