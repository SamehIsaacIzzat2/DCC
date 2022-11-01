import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { optiondata } from 'src/app/DCP/lead-management/components/leadfilter/optiondata';
import { EventFilter } from './event-filter.model';


@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss'],
  providers:[EventFilter]
})
export class EventFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
  constructor(public model: EventFilter) { }

  ngOnInit(): void {
  }

  filterReq(evt:Event,opt:string,optionType:string){
    let optiondata:optiondata;
    optiondata = {id:opt,name:optionType};
    if ((evt.srcElement as any).checked) {
      
      this.filter.emit(optiondata);
    } else {
      this.removeFilter.emit(optiondata);
    }

  }

}
