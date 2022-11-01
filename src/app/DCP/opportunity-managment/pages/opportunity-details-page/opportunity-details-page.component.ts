import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { OpportunityDetailsPageModel } from './opportunity-details-page.model';

@Component({
  selector: 'app-opportunity-details-page',
  templateUrl: './opportunity-details-page.component.html',
  styleUrls: ['./opportunity-details-page.component.scss'],
  providers:[OpportunityDetailsPageModel]
})
export class OpportunityDetailsPageComponent implements OnInit {
  private id:string;

  constructor(public model:OpportunityDetailsPageModel, 
    router: ActivatedRoute) { 
    router.params.subscribe((params: Params) => {

      const id = params['id'];
      this.id = id;
       let filter: filterCompany = new filterCompany();
    filter.id= this.id;
    model.getData(filter);

    });
    // let URL = router.url;
    // let URL_AS_LIST = URL.split('/');
    // this.id=URL_AS_LIST[4]
   
  }

  ngOnInit(): void {
  }

}
