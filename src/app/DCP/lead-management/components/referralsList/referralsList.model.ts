import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { ILeadReferralsData } from '../lead-widget/iLeadReferralsData';

@Injectable()
export class ReferralsListModel {
  public p: number = 1;
  public activePage = 1;
  public totalPages: number = 0;
  public id: string;
  byOpportunityorLead: string;
  public referralsTypes: any = {};
  public referralsData: ILeadReferralsData[] = [];
  public loading: boolean = true;

  constructor(
    private apiCaller: APICallerService,
    private routeActive: ActivatedRoute,
    private router: Router
  ) {
    this.routeActive.parent?.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.getReferralsData(this.id);
    });
  }

  public changePage(data: any) {
    this.totalPages = Math.ceil(this.referralsData.length / 5);
    if (data > this.totalPages) {
      this.p = this.totalPages;
      return;
    } else if (data <= 0) {
      this.p = 1;
      return;
    } else {
      this.p = data;
      return;
    }
  }

  public getReferralsData(id: string) {
    this.apiCaller.showLoader();

    let apiPath = '';
    if (this.router.url.indexOf('opportunities') == -1) {
      apiPath = APIs.leads.referralsList + id;
    } else {
      apiPath = APIs.leads.referralsListByOpportunity + id;
    }

    this.apiCaller.get(apiPath, false).subscribe((res) => {
      this.apiCaller.hideLoader();
      if (!res.isError) {
        this.loading = false;
        this.referralsData = res.result;
        console.log(this.referralsData )
      }
    });
  }
}
