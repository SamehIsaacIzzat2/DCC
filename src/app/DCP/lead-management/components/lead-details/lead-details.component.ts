import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, Subscription, take } from 'rxjs';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { LeadDetailsInfoModel } from './lead-details-info.model';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
  providers:[LeadDetailsInfoModel]
})
export class LeadDetailsComponent implements OnInit {
  
  private id:string;
  constructor(public model:LeadDetailsInfoModel, router: Router) {
    let URL = router.url;
    let URL_AS_LIST = URL.split('/');
    this.id=URL_AS_LIST[4]
    }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    let filter: filterCompany = new filterCompany();
    filter.id= this.id;
    this.model.getData(filter);
    this.model.getDataOfLeadStatus();

  }



}
