import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { LeadFilter } from './lead-filter.model';
import { optiondata } from './optiondata';

@Component({
  selector: 'app-leadfilter',
  templateUrl: './leadfilter.component.html',
  styleUrls: ['./leadfilter.component.scss'],
  providers: [LeadFilter]

})
export class LeadfilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
  @Input() verticalLineInDataCase:boolean=false;
  constructor(public model: LeadFilter) { }

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
