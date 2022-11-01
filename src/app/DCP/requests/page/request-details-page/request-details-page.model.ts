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
import { filterCompany } from './filter.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class requestDetailsPageModel {
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
    title: this.translate.instant('reqestModule.requestDetails.banner.title'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translate.instant('bannerData.breadCrump.requests'), link: '/dcc/services/requests' },
      { title: this.translate.instant('reqestModule.requestDetails.banner.title') },
    ]

  }

  requestStatus: RequestStatusCard[] = [
    {
      title: 'Submitted',
      state: RequestState.active,
    },
    {
      title: 'In progress',
      state: RequestState.inactive,
    },
  ];

  productData: any[] = [];
  industryData: any[] = [];
  interestData: any[] = [];
  activityData: any[] = [];

  sortByData: any[] = [];

  locationData: any[] = [];
  requestLookups: any[] = [];

  itemdetails: any;
  item: any;
  companys: any;
  loading: boolean = true;
  status: any[];
  filter: string[] = [];
  constructor(public translate: TranslateService, private apiSer: APICallerService, private formbuilder: FormBuilder) {
    this.initForm();
  }

  getData(filter: filterCompany) {
    // this.apiSer.showLoader();
    let mycompanys = APIs.requests.companies + '/' + filter.id;
    if (filter.ProductIds || filter.IndustryIds || filter.LocationIds || filter.ActivitiesId || filter.RequestCompaniesSortType) {
      mycompanys += '?';
    }
    if (filter.ProductIds) {
      mycompanys += 'ProductIds=' + filter.ProductIds + '&';
    }
    if (filter.IndustryIds) {
      mycompanys += 'IndustryIds=' + filter.IndustryIds + '&';
    }
    if (filter.LocationIds) {
      mycompanys += 'LocationIds=' + filter.LocationIds + '&';
    }
    if (filter.ActivitiesId) {
      mycompanys += 'ActivitiesId=' + filter.ActivitiesId + '&';
    }
    if (filter.RequestCompaniesSortType) {
      mycompanys +=
        'RequestCompaniesSortType=' + filter.RequestCompaniesSortType;
    }
    const mycompanys$ = this.apiSer
      .get(mycompanys)
      .pipe(takeUntil(this.endSub$));
    const apiPath2 = APIs.requests.getDetails + '/' + this.id;
    const details$ = this.apiSer.get(apiPath2).pipe(takeUntil(this.endSub$));
    const status$ = this.apiSer.get(APIs.lookups.companyStatus);

    combineLatest([details$, status$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details, status]) => {
        console.log("hello");
        // this.apiSer.hideLoader();
        if (!details.isError) {
          const result = details.result;
          console.log(result);
          this.item = {
            requestId: result.id,
            requestNumber: result.requestNumber,
            requestTitle: result.requestType,
            serviceTypeName: result.serviceTypeName,
            status: result.status,
            statusName: result.statusName,
            created: result.created,
          };
          // console.log("hi this is status => " , this.item)

          this.itemdetails = {
            interestId: result.interestName,

            // companyIds: "Company-1",
            activitiesIds: result.activitiesNames,
            industriesIds: result.industriesNames,
            countriesIds: result.countries,
            citiesIds: result.cities,
            locations: result.locations,
            productsIds: result.productsNames,
            description: result.description,
            status: result.statusName,
            created: result.created,
          };
        }

        if (!status.isError) {
          this.status = status.result;
        }
      });

    // get matching lines only
    mycompanys$.subscribe((actions) => {
      if (!actions.isError) {
        const resultCompanys = actions.result;
        this.companys = resultCompanys;
        console.log('this si companys:>', this.companys);
      }
    })

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
        this.loading = false;
      }
    });
  }

  filterReq(evt: Event, opt: any) {
    if ((evt.srcElement as any).checked) {
      this.filterData(opt);
    } else {
      this.removefilterData(opt);
    }
    this.refreshActions();
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

  getselectData(id: string) {
    const requestlookups = this.apiSer.get(
      APIs.requests.requestlookups + '?requestId=' + id
    );
    const sortByLookups = this.apiSer.get(APIs.lookups.sortCompanyTypes);

    combineLatest([requestlookups, sortByLookups])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([requestlookups, sortByLookups]) => {
        this.productData = requestlookups.result.products;
        this.industryData = requestlookups.result.industries;
        this.activityData = requestlookups.result.activities;
        this.locationData = requestlookups.result.countries;
        this.sortByData = sortByLookups.result;
        console.log('sort By => ', this.sortByData);
      });
  }

  // getProducts(){

  //   this.apiSer.get(APIs.lookups.products,true).subscribe(result=>{
  //     this.products = result.result;
  //   })
  // }

  ApplyFilter(sortby: number[]) {
    console.log(
      'this is the result of filter',
      this.requestData.controls['products'].value
    );
    let filter: filterCompany;
    filter = new filterCompany();
    filter.id = this.id;
    filter.ProductIds = this.requestData.controls['products'].value;
    filter.IndustryIds = this.requestData.controls['industries'].value;
    filter.LocationIds = this.requestData.controls['locations'].value;
    filter.ActivitiesId = this.requestData.controls['activities'].value;
    filter.RequestCompaniesSortType = sortby?.toString();

    this.getData(filter);
  }

  ClearFilter() {
    this.requestData.controls['products'].setValue('');
    this.requestData.controls['industries'].setValue('');
    this.requestData.controls['interests'].setValue('');
    this.requestData.controls['locations'].setValue('');
    this.requestData.controls['activities'].setValue('');

    let filter: filterCompany;
    filter = new filterCompany();
    filter.id = this.id;
    this.getData(filter);
  }
}
