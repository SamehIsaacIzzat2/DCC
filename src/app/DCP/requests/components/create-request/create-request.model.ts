import { SnackService } from './../../../../SharedModule/Services/snack.service';
import { draftReq } from './../../interfaces/draftReq.interface';
import { FormBuilder } from '@angular/forms';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { EventEmitter, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { createRequestModel } from '../../page/create-request-page/crreate-request.model';
import { createRequest } from '../../page/create-request-page/create-request.interface';

@Injectable()
export class CreateRequest {
  //========================Data==================================
  endSub$ = new Subject();
  interestData: any[] = [];
  activitiestData: any[] = [];
  locationData: any[] = [];
  cityData: any[] = [];
  usercompanies: any[] = [];
  productData: any[] = [];
  industryData: any[] = [];
  filteredOptions: Observable<any[]>;
  filteredOptionsProd: Observable<any[]>;
  filteredOptionsInd: Observable<any[]>;
  filteredOptionsLocations: Observable<any[]>;
  filteredOptionsCitys: Observable<any[]>;
  filteredOptions2: any[] = [];
  filteredOptionsProd2: any[] = [];
  filteredOptionsInd2: any[];
  filteredOptionsLocations2: any[];
  selectedActivities: any[] = [];
  selectedProducts: any[] = [];
  selectedIndustries: any[] = [];
  selectedLocation: any[] = [];
  selectedCity: any[] = [];
  requestDetailData: any;
  requestData: FormGroup;
  pageModel: createRequestModel;
  Detailsdata: createRequest = {} as createRequest;
  setData: EventEmitter<createRequest>;
  setDetailsData: EventEmitter<createRequest>;
  timeout: any;
  loading: boolean = true;
  constructor(
    private apiSer: APICallerService,
    private formbuilder: FormBuilder,
    private snakSer: SnackService
  ) {
    // this.usercompanies = [
    //   { id: 1, name: 'company-1' },
    //   { id: 2, name: 'company-2' },
    // ];
    this.initForm();
    this.getselectData();
    this.getDpendantSelectData();
  }
  getDpendantSelectData(prodName = '', industName = '', actName = '') {
    this.activitiestData = [];
    this.productData = [];
    this.industryData = [];
    this.setFilteration();
    let productsIds = this.selectedProducts.map((prod) => prod.id).join(',');
    let productsParentIds = this.selectedProducts
      .map((prod) => prod.parentId)
      .join(',');

    if (productsParentIds.length > 0) {
      productsIds = productsIds + ',' + productsParentIds;
    }

    // console.log(productsParentIds);
    let industriesIds = this.selectedIndustries
      .map((industry) => industry.id)
      .join(',');
    let activitiesIds = this.selectedActivities.map((act) => act.id).join(',');
    const prod$ = this.apiSer.get(
      APIs.lookups.products +
        `?ActivitiesIds=${activitiesIds}&IndustriesIds=${industriesIds}&Name=${prodName}`,
      false
    );
    const indust$ = this.apiSer.get(
      APIs.lookups.industries +
        `?ProductsId=${productsIds}&ActivitiesIds=${activitiesIds}&Name=${industName}`,
      false
    );
    const activities$ = this.apiSer.get(
      APIs.lookups.activities +
        `?ProductsId=${productsIds}&IndustriesIds=${industriesIds}&Name=${actName}`,
      false
    );
    combineLatest(prod$, indust$, activities$)
      .pipe(takeUntil(this.endSub$))
      .subscribe(([prods, industs, acts]) => {
        if (!prods.isError) this.productData = prods.result;
        if (!industs.isError) this.industryData = industs.result;
        if (!acts.isError) this.activitiestData = acts.result;
        this.setFilteration();
      });
  }
  onKeyUpHandler(prodName = '', industName = '', actName = '') {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getDpendantSelectData(prodName, industName, actName);
    }, 1000);
  }
  // Form Intialization
  private initForm() {
    this.requestData = this.formbuilder.group({
      company: [''],
      interest: ['', Validators.required],
      activities: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      products: ['', Validators.required],
      industries: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  //Check for Edit mode
  public checkEditMode() {
    if (this.pageModel && this.pageModel.requestDetailData$) {
      // console.log("from check edit response",this.pageModel.requestDetailData$);

      this.pageModel.requestDetailData$
        .pipe(takeUntil(this.endSub$))
        .subscribe((req: draftReq) => {
          // console.log("req",req);

          if (req) {
            // console.log("enter here")
            // debugger
            this.setDataInputs(req);
          }
        });
    }
  }
  //get All select data
  getselectData() {
    const interests = this.apiSer.get(APIs.lookups.interests, false);
    const locations = this.apiSer.get(APIs.lookups.countrys, false);
    const companies = this.apiSer.get(APIs.lookups.myCompany, false);
    // const citys = this.apiSer.get(APIs.lookups.citys, false);
    combineLatest([interests, locations, companies])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([interests, locations, myCompanies]) => {
        if (!interests.isError) this.interestData = interests.result;
        if (!locations.isError) this.locationData = locations.result;
        if (!myCompanies.isError) this.usercompanies = myCompanies.result;
        if (this.usercompanies.length === 1) {
          this.requestData.controls['company'].setValue(
            this.usercompanies[0].id
          );
        }

        // if (!citys.isError) this.cityData = citys.result;
        this.setDataFunc(true);
        this.setFilteration();
      });
  }
  // get All cities in one specific country and merge them
  getCitiesRealtedToOptiong(countryId: string) {
    this.apiSer
      .get(APIs.lookups.citys + '/' + countryId, false)
      .pipe(takeUntil(this.endSub$))
      .subscribe((cities) => {
        if (!cities.isError) {
          this.cityData = [...this.cityData, ...cities.result];
          this.cityData = this.cityData.filter((city) => {
            const isExist =
              this.selectedLocation.findIndex(
                (ele) => ele.id == city.countryId
              ) > -1;
            if (isExist) return true;
            return false;
          });
          // to remove duplication
          this.cityData = [
            ...new Map(this.cityData.map((city) => [city.id, city])).values(),
          ];
          this.setFilteration();
        }
      });
  }
  // adjust cities options if country removed from selected ones
  private adjustCitesWithCountryRemove(countryId: string) {
    this.cityData = this.cityData.filter(
      (city) => city.countryId !== countryId
    );
    this.setFilteration();
  }

  // getindustrysdataonly(
  //   name: string,
  //   productids: string[],
  //   activityids: string[]
  // ) {
  //   let industrypath = APIs.lookups.industries;
  //   if (
  //     (productids != null && productids.length > 0) ||
  //     (activityids != null && activityids.length > 0) ||
  //     (name != null && name != '')
  //   ) {
  //     industrypath += '?';
  //     if (activityids != null && activityids.length > 0) {
  //       industrypath += 'IndustriesIds=' + activityids;
  //     }
  //     if (name != null && name != '') {
  //       if (activityids != null && activityids.length > 0) {
  //         industrypath += '&Name=' + name;
  //       } else {
  //         industrypath += 'Name=' + name;
  //       }
  //     }
  //   }
  //   const indusytrs = this.apiSer.get(industrypath, false);

  //   combineLatest([indusytrs])
  //     .pipe(takeUntil(this.endSub$))
  //     .subscribe(([indusytrs]) => {
  //       this.industryData = indusytrs.result;
  //     });
  //   return this.industryData;
  // }

  setFilteration() {
    this.filteredOptions = this.requestData.controls[
      'activities'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.activitiestData, value || ''))
    );
    this.filteredOptionsProd = this.requestData.controls[
      'products'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.productData, value || ''))
    );
    this.filteredOptionsInd = this.requestData.controls[
      'industries'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.industryData, value || ''))
    );
    this.filteredOptionsLocations = this.requestData.controls[
      'location'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.locationData, value || ''))
    );
    this.filteredOptionsCitys = this.requestData.controls[
      'city'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.cityData, value || ''))
    );
    // return this.filteredOptionsCitys;
  }

  selectLocation(location: any) {
    this.selectedLocation = location;
    this.setDataFunc();
  }

  private _filter(arr: any[], value: any): string[] {
    const filterValue = value.toLowerCase();
    return arr.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public addOpt(arr: any[], controlsName: string, opt: any) {
    // console.log("before adding opt",arr);
    if (
      arr.indexOf(opt) == -1 &&
      arr.find((ele) => ele.id == opt.id) == undefined
    ) {
      arr.push(opt);
    } else {
      this.snakSer.snack(`${opt.name} is already added`);
    }
    // console.log("After adding opt",arr);
    this.requestData.controls[controlsName].reset();
    this.setDataFunc();
    if (controlsName == 'location') {
      this.getCitiesRealtedToOptiong(opt.id);
    }
  }

  public removeOpt(arr: any[], opt: any, removetype: string) {
    //remove city related to removed country
    if (removetype == 'country') {
      this.selectedCity = this.selectedCity.filter(
        (x) => x.countryId != opt.id
      );
      this.adjustCitesWithCountryRemove(opt.id);
    }
    arr.splice(
      arr.findIndex((ele) => ele.id == opt.id),
      1
    );
    this.getDpendantSelectData();
    if (removetype == 'country' || removetype == 'city') this.setDataFunc(true);
    else this.setDataFunc();
  }

  setDataFunc(callConcatanationAPI: boolean = false) {
    // debugger
    const data: createRequest = {
      activitiesIds: this.selectedActivities.map((ele) => ele.id),
      interestId: this.requestData.controls['interest'].value,
      industriesIds: this.selectedIndustries.map((ele) => ele.id),
      productsIds: this.selectedProducts.map((ele) => ele.id),
      description: this.requestData.controls['description'].value,
      countriesIds: this.selectedLocation.map((ele) => ele.id),
      citiesIds: this.selectedCity.map((ele) => ele.id),
      companyId: this.requestData.controls['company'].value,
      locations: [],
    };
    // console.log("in set fun",data);
    this.setData.emit(data);
    this.Detailsdata = {
      ...this.Detailsdata,
      activitiesIds: this.selectedActivities.map((ele) => ele.name),
      interestId: this.interestData.find(
        (ele) => ele.id == this.requestData.controls['interest'].value
      )?.name,
      industriesIds: this.selectedIndustries.map((ele) => ele.name),
      productsIds: this.selectedProducts.map((ele) => ele.name),
      description: this.requestData.controls['description'].value,
      countriesIds: this.selectedLocation.map((x) => x.name),
      citiesIds: this.selectedCity.map((x) => x.name),
      companyId: this.usercompanies.find(
        (ele) => ele.id == this.requestData.controls['company'].value
      )?.name,
    };
    this.loading = false;
    console.log(
      'Data that will dispaly--2',
      this.usercompanies,
      this.Detailsdata,
      this.requestData.controls['company'].value,
      this.Detailsdata.interestId,
      this.interestData
    );

    if (callConcatanationAPI) {
      this.apiSer
        .post(
          APIs.requests.concatConutryAndCity,
          {
            countries: this.selectedLocation,
            cities: this.selectedCity,
          },
          false
        )
        .pipe(takeUntil(this.endSub$))
        .subscribe((result) => {
          this.Detailsdata = {
            ...this.Detailsdata,
            locations: result.result.locations,
          };
          this.setDetailsData.emit(this.Detailsdata);
          return;
        });
    } else {
      this.setDetailsData.emit(this.Detailsdata);
    }
  }
  // setting data in case of edit mode
  public setDataInputs(draftedRequest: draftReq) {
    console.log("draftedRequest", draftedRequest)
    if (draftedRequest && draftedRequest.interest) {
        this.f['company'].setValue(draftedRequest.companyID);
      this.f['description'].setValue(draftedRequest.description);
      this.f['interest'].setValue(draftedRequest.interest.id);
      // this.requestData.controls['location'].setValue(draftedRequest.);
      this.selectedActivities = draftedRequest.activities;
      this.selectedIndustries = draftedRequest.industries;
      this.selectedProducts = draftedRequest.products;
      this.selectedLocation = draftedRequest.countries;
      this.selectedLocation.forEach((country) =>
        this.getCitiesRealtedToOptiong(country.id)
      );
      this.selectedCity = draftedRequest.cities;
      this.getDpendantSelectData();
      this.setDataFunc();
    }
    // debugger
    // this.apiSer.get(APIs.lookups.myCompany, false).subscribe(
    //   (company) => {
    //     if (!company.isError) {
    //       this.usercompanies = company.result;
    //       console.log("draftedRequest", draftedRequest)
    //       if (draftedRequest && draftedRequest.interest) {
    //         if (this.usercompanies && this.usercompanies.length > 0) {
    //           this.f['company'].setValue(draftedRequest.companyID);
    //         }
    //         this.f['description'].setValue(draftedRequest.description);
    //         this.f['interest'].setValue(draftedRequest.interest.id);
    //         // this.requestData.controls['location'].setValue(draftedRequest.);
    //         this.selectedActivities = draftedRequest.activities;
    //         this.selectedIndustries = draftedRequest.industries;
    //         this.selectedProducts = draftedRequest.products;
    //         this.selectedLocation = draftedRequest.countries;
    //         this.selectedLocation.forEach((country) =>
    //           this.getCitiesRealtedToOptiong(country.id)
    //         );
    //         this.selectedCity = draftedRequest.cities;
    //         this.getDpendantSelectData();
    //         this.setDataFunc();
    //       }
    //     }

    //   }
    // )

  }

  // Getters and Setters
  get f(): { [key: string]: AbstractControl } {
    return this.requestData.controls;
  }
}
