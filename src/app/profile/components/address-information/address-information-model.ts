import { LookupService } from './../../../SharedModule/Services/lookup.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Injectable } from '@angular/core';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { combineLatest, takeUntil, Subject, BehaviorSubject } from 'rxjs';
import { AddressInfo, UserProfile } from '../../interfaces/interfaces';
import { viewCompState } from '../../Enums/edit-components.enum';

@Injectable()
export class AddressInformationModel {
  public addressData: AddressInfo;
  public allCities: any[];
  public allCountries: any[];
  private endSub$ = new Subject();
  public cityName: string = '';
  public stateMode: viewCompState = 1;

  constructor(
    private authSer: AuthenticationService,
    private lookupSer: LookupService,
    private APISer: APICallerService
  ) {


    this.getLookupData();
  }

  //==========================Logic======================

  getCurrentProfile() {
    let obs$: BehaviorSubject<UserProfile | null>;
    this.stateMode === viewCompState.viewAndEdit ? obs$ = this.authSer.userProfileData$ : obs$ = this.authSer.userProfileEditedData$
    obs$
      .pipe(takeUntil(this.endSub$))
      .subscribe((user: UserProfile | null) => {
        if (user) {
          this.addressData = user.addressInfo;
          this.getCityName(this.addressData.cityId);
        }
      });
  }
  getLookupData() {
    const cities = this.lookupSer.getCities();
    const countries = this.lookupSer.getCountries();
    combineLatest([countries, cities])
      .pipe()
      .subscribe(([countriesRes, citiesRes]) => {
        this.allCities = citiesRes;
        this.allCountries = countriesRes;
      });
  }
  public getLookup(arr: any[], id: string | undefined) {
    // console.log(`in ${arr} we search for ${id}`)
    if (arr && arr.length > 0 && id) return arr.find((ele: any) => ele.id == id).name;
    return "";
  }

  // to handle city name without using getlookup function
  public getCityName(cityId: string | undefined) {
    if (cityId) {
      this.APISer.get(APIs.lookups.cities + "?Id=" + cityId).subscribe(cityData => {
        if (!cityData.isError) {
          this.cityName = cityData.result[0].name;
        }
      })
    }
  }
}
