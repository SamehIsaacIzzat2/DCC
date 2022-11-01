import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { optiondata } from 'src/app/DCP/requests/components/request-filter/optiondata';
import { OpportunityFilter } from './opportunity-filter.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-opportunity-filter',
  templateUrl: './opportunity-filter.component.html',
  styleUrls: ['./opportunity-filter.component.scss'],
  providers:[OpportunityFilter]
})
export class OpportunityFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
  @Input() verticalLineInDataCase:boolean=false;
  constructor(public model: OpportunityFilter, public translate:TranslateService) { }

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
