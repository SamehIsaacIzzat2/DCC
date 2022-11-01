import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { ILeadReferralsData } from '../lead-widget/iLeadReferralsData';

@Injectable()
export class ReferralDetailsModel {
  public referralDetails: ILeadReferralsData;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiCaller: APICallerService
  ) {
    this.route.params.subscribe((params: Params) => {
      const id = params['referralId'];
      this.getReferralDetails(id);
    });
  }

  public getReferralDetails(id: string) {
    this.apiCaller.showLoader();
    const apiPath = APIs.leads.referralDetails + id;
    this.apiCaller.get(apiPath, false).subscribe((res) => {
      this.apiCaller.hideLoader();
      if (!res.isError) {
        this.referralDetails = res.result;
        this.loading = false;
      }
    });
  }
}
