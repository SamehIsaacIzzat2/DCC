import { takeUntil, Subject, combineLatest, Observable } from 'rxjs';
import { APIs } from '../../../../CallerModule/Data/APIs';
import { APICallerService } from '../../../../CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { ILeadInteractionData } from '../lead-widget/iLeadInteractionData';
import { LeadStatus } from '../leadfilter/lead-status.model';
import {
  RequestState,
  RequestStatusCard,
} from 'src/app/SharedModule/Components/request-status-card/IrequestCard';
import { Router } from '@angular/router';

@Injectable()
export class LeadDetailsInfoModel {
  public id: string = '';
  endSub$ = new Subject();
  interactionsData: ILeadInteractionData[] = [];

  //===========================Data============================

  item: any;
  loading: boolean = true;
  LeadStatus: string;

  LeadsStatus: RequestStatusCard[] = [];
  companys: any;
  status: any[];
  filter: string[] = [];
  constructor(private apiSer: APICallerService, private router: Router) {}

  getData(filter: filterCompany) {
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.leadDetails + '/' + filter.id;
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
            id: result.id,
            comapnyId: result.companyNameId,
            companyName: result.companyName,
            leadName: result.leadName, // Name of second party (company from BMLine) ,back end changes and see lead is first party
            leadId: result.leadNameId, // id of second party (company from BMLine),back end changes and see lead is first party
            interestId: result.interests,
            status: result.status,
            statusName: result.statusName,
            created: result.created,
            activitiesIds: result.activities,
            productsIds: result.products,
            industriesIds: result.industrys,
            locations: result.locations,
          };
          this.LeadStatus = this.item.statusName;
          this.loading = false;
        }
      });
  }

  getDataOfLeadStatus() {
    let index: number = 1;
    const apiPath = APIs.lookups.LeadStatus;
    this.apiSer
      .get(apiPath)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        if (res.result == undefined) {
          this.LeadsStatus = [];
        } else {
          res.result.forEach((element: { name: any }) => {
            if (index == 1) {
            } else {
              this.LeadsStatus.push({
                state: RequestState.inactive,
                title: element.name,
              });
            }
            index++;
          });
        }
      });
  }

  endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  goToCompanyInfo() {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([
        `/dic/services/leads/${this.item.id}/companyInfo/${this.item.leadId}`,
      ])
    );
    console.log(url);

    window.open(url, '_blank');
  }
}
