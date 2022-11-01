import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { optiondata } from 'src/app/DCP/lead-management/components/leadfilter/optiondata';
import { CompanyFilter } from './company-filter.model';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
  providers: [CompanyFilter],
})
export class CompanyFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Output() removeFilter = new EventEmitter();
  constructor(public model: CompanyFilter) {}

  ngOnInit(): void {}

  filterReq(evt: Event, opt: string, optionType: string) {
    let optiondata: optiondata;
    optiondata = { id: opt, name: optionType };
    if ((evt.srcElement as any).checked) {
      this.filter.emit(optiondata);
    } else {
      this.removeFilter.emit(optiondata);
    }
  }
}
