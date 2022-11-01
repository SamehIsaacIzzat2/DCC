import { TranslateService } from '@ngx-translate/core';
import { takeUntil, Subject, combineLatest, Observable } from 'rxjs';
import { APIs } from './../../../../CallerModule/Data/APIs';
import { APICallerService } from './../../../../CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
@Injectable()
export class OpportunityDetailsPageModel {
  requestData: FormGroup;
  sortBy: string;
  public id: string = '';
  endSub$ = new Subject();
  initForm() {
    this.requestData = this.formbuilder.group({
      products: [''],
      industries: [''],
      interests: [''],
      locations: [''],
      activities: [''],
      sortBy: [''],
    });
  }

  //===========================Data============================
  banner: iBanner = {
    title: this.translateSer.instant("opportunitiesModule.opportunitiesInfo.opportunityInformation"),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translateSer.instant('opportunitiesModule.bannerTitle.mainTitle'), link: '/dcc/services/opportunities' },
      { title: this.translateSer.instant('opportunitiesModule.opportunitiesInfo.opportunityInformation') },
      ]
  };

  itemdetails: any;
  item: any;
  companys: any;
  status: any[];
  filter: string[] = [];
  constructor(
    private apiSer: APICallerService,
    private formbuilder: FormBuilder,
    private translateSer:TranslateService
  ) {
    this.initForm();

  }

  refreshActions() {
    let filter = '';
    if (this.filter.length > 0) {
      filter = this.filter.join(',');
    } else {
      filter = '';
    }
    const apiPath1 =
    APIs.requests.companies + '/' + this.id + '?CompanyStatus=' + filter;
    const mycompanys$ = this.apiSer.get(apiPath1).pipe(takeUntil(this.endSub$));
    mycompanys$.pipe(takeUntil(this.endSub$)).subscribe((res) => {
      if (!res.isError) {
        const result = res.result;
        this.companys = result;
      }
    });
  }

  filterData(evt: string) {
    this.filter.push(evt);
  }

  removefilterData(evt: string) {
    this.filter.splice(
      this.filter.findIndex((ele: string) => ele == evt),
      1
    );
  }

  endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  getData(filter:filterCompany) {
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.leadopportunityInfo + "/" + filter.id;
    const mycompanys$ = this.apiSer.get(mycompanys, false).pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$]).pipe(takeUntil(this.endSub$)).
    subscribe(([details]) => {
      this.apiSer.hideLoader();
      if (!details.isError) {
        const result = details.result;
        this.item = {
          opportunityNumber: result.opportunityNumber,
          opportunityName:result.opportunityName,
          companyIds: result.companyName,
          interestId:result.interests,
          status:result.status,
          statusName: result.statusName,
          createdOn: result.created,
          activitiesIds:result.activities,
          productsIds:result.products,
          industriesIds:result.industrys,
          locations:result.locations


        };
        localStorage.setItem("opportunityStatus",this.item.status);

        console.log("hi this is status => " , this.item)


      }

    })
  }
}
