import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { OpportunityDetailsInfoModel } from './opportunity-details-info.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-opportunity-info',
  templateUrl: './opportunity-info.component.html',
  styleUrls: ['./opportunity-info.component.scss'],
  providers:[OpportunityDetailsInfoModel]
})
export class OpportunityInfoComponent implements OnInit {
  private id:string;

  constructor(public model:OpportunityDetailsInfoModel, router: Router, public translate:TranslateService) { 
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

  }

}
