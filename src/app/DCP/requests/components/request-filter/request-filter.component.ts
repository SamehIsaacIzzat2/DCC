import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { optiondata } from './optiondata';
import { RequestFilter } from './request-filter.model';

@Component({
  selector: 'request-filter',
  templateUrl: './request-filter.component.html',
  styleUrls: ['./request-filter.component.scss'],
  providers: [RequestFilter]
})
export class RequestFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
  @Input() verticalLineInDataCase:boolean=false;
  constructor(public model: RequestFilter) { }

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
