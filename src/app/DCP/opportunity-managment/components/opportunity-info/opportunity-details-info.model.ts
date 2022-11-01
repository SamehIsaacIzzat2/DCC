import { takeUntil, Subject, combineLatest, Observable } from 'rxjs';
import { APIs } from '../../../../CallerModule/Data/APIs';
import { APICallerService } from '../../../../CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';

@Injectable()
export class OpportunityDetailsInfoModel {
  public id: string = '';
  endSub$ = new Subject();

  //===========================Data============================

  item: any;
  companys: any;
  status: any[];
  filter: string[] = [];
  loading: boolean = true;
  constructor(private apiSer: APICallerService) {}

  getData(filter: filterCompany) {
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.leadopportunityInfo + '/' + filter.id;
    const mycompanys$ = this.apiSer
      .get(mycompanys, false)
      .pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details]) => {
        this.apiSer.hideLoader();
        if (!details.isError) {
          const result = details.result;
          this.item = {
            leadNumber: 99,
            leadName: 'Leand Number 1',
            companyIds: result.companyName,
            interestId: result.interests,
            status: result.status,
            statusName: result.statusName,
            created: result.created,
            activitiesIds: result.activities,
            productsIds: result.products,
            industriesIds: result.industrys,
            locations: result.locations,
          };
          console.log('hi this is status => ', this.item);
          this.loading = false;
        }
      });
  }

  endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
