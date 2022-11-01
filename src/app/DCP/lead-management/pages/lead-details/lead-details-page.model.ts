import { TranslateService } from '@ngx-translate/core';
import { takeUntil, Subject, combineLatest, Observable } from 'rxjs';
import { APIs } from './../../../../CallerModule/Data/APIs';
import { APICallerService } from './../../../../CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import {
  RequestState,
  RequestStatusCard,
} from 'src/app/SharedModule/Components/request-status-card/IrequestCard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { ILeadInteractionData } from '../../components/lead-widget/iLeadInteractionData';
import { StatusNotifierService } from '../../status-notifier.service';

@Injectable()
export class LeadDetailsPageModel {
  //******************************Data************************************************** */
  public requestData: FormGroup;
  public sortBy: string;
  public id: string = '';
  public endSub$ = new Subject();
  public interactionsData: ILeadInteractionData[] = [];
  public itemdetails: any;
  public item: any;
  public companys: any;
  public status: any[];
  public filter: string[] = [];

  public banner: iBanner = {
    title: this.translateSer.instant('leadsModule.leadsInfo.leadInformation'),
    withPrevArrow: true,
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/leads' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leadDetails') },
    ],
  };

  public requestStatus: RequestStatusCard[] = [
    {
      title: 'Submitted',
      state: RequestState.active,
    },
    {
      title: 'In progress',
      state: RequestState.inactive,
    },
  ];

  constructor(
    private apiSer: APICallerService,
    private formbuilder: FormBuilder,
    private notifierSer: StatusNotifierService,
    private translateSer:TranslateService
  ) {
    this.initForm();
  }
  //***************************************Logic************************************* */

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

  getData(filter: filterCompany) {
    let updatedStatus: any = '';

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
          // console.log('============================hi this is result => ', result);
          this.item = {
            leadId: result.id,
            leadNumber: result.leadNumber,
            leadName: result.leadName,
            requestTitle: result.requestType,
            serviceTypeName: result.serviceTypeName,
            status: result.status,
            statusName: result.statusName,
            created: result.created,
            companyName: result.companyName,
          };

          // check if status change due to interaction result
          this.notifierSer.changeStatusListener.subscribe((res) => {
            if (res != null && res != '' && res != undefined) {
              updatedStatus = res;
              this.item = {
                ...this.item,
                statusName: updatedStatus,
              };
            }
          });

          this.itemdetails = {
            interestId: result.interests,

            companyIds: 'Company-1',
            activitiesIds: result.activities,
            industriesIds: result.industrys,
            countriesIds: result.countries,
            citiesIds: result.cities,
            locations: result.locations,

            productsIds: result.products,
            status: result.statusName,
          };

          localStorage.setItem('LeadStatus', this.item.status);
          localStorage.setItem('LeadId', this.item.leadId);
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

  // refreshActions() {
  //   let filter = '';
  //   if (this.filter.length > 0) {
  //     filter = this.filter.join(',');
  //   } else {
  //     filter = '';
  //   }
  //   const apiPath1 =
  //     APIs.requests.companies + '/' + this.id + '?CompanyStatus=' + filter;
  //   const mycompanys$ = this.apiSer.get(apiPath1).pipe(takeUntil(this.endSub$));
  //   mycompanys$.pipe(takeUntil(this.endSub$)).subscribe((res) => {
  //     if (!res.isError) {
  //       const result = res.result;
  //       this.companys = result;
  //     }
  //   });
  // }

  // filterReq(evt: Event, opt: any) {
  //   if ((evt.srcElement as any).checked) {
  //     this.filterData(opt);
  //   } else {
  //     this.removefilterData(opt);
  //   }
  //   this.refreshActions();
  // }
}
