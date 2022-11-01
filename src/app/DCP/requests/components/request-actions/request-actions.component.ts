import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import {
  itemCompany,
  itemCompany2,
} from 'src/app/SharedModule/Components/request-details/itemcompany';
import { RequestAction } from './request-action.model';
import { take, pluck } from 'rxjs';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { InitiateLeads } from './initiateLeads';

@Component({
  selector: 'request-actions',
  templateUrl: './request-actions.component.html',
  styleUrls: ['./request-actions.component.scss'],
  providers: [RequestAction],
})
export class RequestActionsComponent implements OnChanges {
  id: string;
  selectedCompanys: itemCompany2[] = [];
  item: itemCompany;
  showCompanys: boolean = true;
  @Input() requests: any;
  loading: boolean = true;
  @Input() requestStatus: number;
  @Input() requestId: string = '';
  @Output() refreshEvt = new EventEmitter();
  public p: number = 1;
  public totalPages: number = 0;
  @Output() showDetailsCompanuy = new EventEmitter();

  constructor(
    public model: RequestAction,
    private apiSer: APICallerService,
    private active: ActivatedRoute,
    private route: Router,
    private snaakSer: SnackService
  ) {
    this.getId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.requests) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }

  refresh() {
    this.refreshEvt.emit();
  }

  getId() {
    this.active.params.pipe(take(1), pluck('id')).subscribe((id) => {
      this.id = id;
    });
  }

  //===================pagination-Logic======================\

  changePage(data: any) {
    this.totalPages = Math.round(this.requests.length / 2);
    console.log(data + ' ' + this.totalPages);
    if (data > this.totalPages) {
      this.p = 1;
    } else if (data <= 0) {
      this.p = this.totalPages;
    } else {
      this.p = data;
    }
  }

  showDetailsCompany(id: string) {
    // let apiPathGetCompanyDetails =  APIs.requests.requestCompanyDetails
    // this.apiSer.get(apiPathGetCompanyDetails+"/"+id).subscribe(result=>{
    // console.log("this is result to show details",result);
    // this.item = new itemCompany();
    // this.item.Activities = result.result.activitiesNames;
    // this.item.CompanyName=result.result.name;
    // this.item.CompanySize = result.result.size;
    // this.item.Products = result.result.productsNames;
    // this.item.industries = result.result.industries;
    // this.item.countries = result.result.countries;
    // this.item.cities = result.result.cities;
    // });
    // this.showCompanys=false;
    // this.showDetailsCompanuy.emit();
  }

  CloseRequest() {
    let pathClose = APIs.requests.closeRequest;
    this.apiSer.post(pathClose + '/' + this.id, null).subscribe((result) => {
      console.log('result of close requet', result);
      if (result.result.isSucceed) {
        this.snaakSer.snack('Request Closed Successfully');
        this.route.navigate(['/requests']);
      } else {
        this.snaakSer.snack('Request Failed !! ');
      }
    });
  }

  doinitiate() {
    let initiates = new InitiateLeads();
    this.selectedCompanys.forEach((x) => {
      initiates.businessMatchingLineIds.push(x.businessMatchingLineId);
    });
    if (this.selectedCompanys.length == 0) {
      this.snaakSer.snack('Select at least one company');
    } else {
      this.InitialLeads(initiates);
    }
  }
  InitialLeads(initiates: InitiateLeads) {
    let pathInitiate = APIs.requests.initiateLeads;
    this.apiSer.post(pathInitiate, initiates).subscribe((result) => {
      console.log('result of close requet', result);
      if (result.result.isSucceed) {
        this.snaakSer.snack('Lead Initiated Successfully');
        this.route.navigate(['/dic/services/leads']);
      } else {
        this.snaakSer.snack('Request Failed !! ');
      }
    });
  }

  selectcompanyanddeselect(selected: boolean, item: itemCompany2) {
    console.log('this is selected company', selected);
    if (selected) {
      this.selectedCompanys.push(item);
    } else {
      this.selectedCompanys = this.selectedCompanys.filter(
        (x) => x.id != item.id
      );
    }
    console.log('this is selected companys', this.selectedCompanys);
  }
}
