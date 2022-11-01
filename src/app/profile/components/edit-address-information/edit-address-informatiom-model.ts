import { LookupService } from './../../../SharedModule/Services/lookup.service';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AddressInfo, SocialInfo } from './../../interfaces/interfaces';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { EventEmitter, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { UserProfile } from '../../interfaces/interfaces';
import { editCompState } from '../../Enums/edit-components.enum';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditAddressInformatiomModel {
  // ===================================Data=======================

  public editAddressInformationForm: FormGroup;
  public allCities: any[];
  public allCountries: any[];
  public submitted: boolean;
  public endSub$ = new Subject();
  public currentUser: UserProfile;
  public stateMode: editCompState = 1;
  public sendEvent: EventEmitter<AddressInfo | null> = new EventEmitter();
  private selectContryFlag:boolean=false;

  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private authService: AuthenticationService,
    private snakSer:SnackService,
    private _router : Router,
    private lookupSer:LookupService,
    private translate:TranslateService

  ) {
    this.getSelectData();
    this.initForm();
    this.setValues();
    console.log(this.editAddressInformationForm)
  }

  //==============================Logic==========================
  get f(): { [key: string]: AbstractControl } {
    return this.editAddressInformationForm.controls;
  }

  //##init-Form
  initForm() {
    this.editAddressInformationForm = this.fb.group({
      address: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      provinceState: [null],
      zipCode: [null],
    });
  }
  //##getAllLookups
  getSelectData() {
    this.lookupSer.getCountries().pipe(takeUntil(this.endSub$)).subscribe(
      (countriesRes)=>{
        this.allCountries = countriesRes;
      }
    )

    // const cities = this.lookupSer.getCities();
    // const countries = this.lookupSer.getCountries()
    // combineLatest([countries, cities])
    //   .pipe(takeUntil(this.endSub$))
    //   .subscribe(([countriesRes, citiesRes]) => {
    //     this.allCities =  citiesRes;
    //     this.allCountries = countriesRes;
    //   });
  }

  getCountryCities(countries:any){
    if (countries){
      this.apiSer.get(APIs.lookups.citys + "/" + countries).pipe(takeUntil(this.endSub$)).subscribe(
        (res) => {
          if (!res.isError) {
            this.allCities = res.result;
          }
        }
      )
    }
    this.allCities = [];
    return;
  }
  //select related city
  selectRelatedCities(data:any){

    //to make sure user select country
    this.selectContryFlag=true;
    let countryId=data.value;

    // call APi to return ralated city
    this.getCountryCities(countryId);

  }

  // selectCity(){
  //   if(!this.selectContryFlag){
  //     this.snakSer.snack("You must select country first");

  //   }
  // }

  //set data
  setValues() {
    this.authService.userProfileData$
      .pipe(takeUntil(this.endSub$))
      .subscribe((userProfile: UserProfile | null) => {
        if (userProfile) {
          this.currentUser = userProfile;
          const addressInfo: AddressInfo = userProfile.addressInfo;
          this.stateMode === editCompState.EditSectionState ? this.getCountryCities(addressInfo.countryId) : "";
          this.f['address'].setValue(addressInfo.address);
          this.f['cityId'].setValue(addressInfo.cityId);
          this.f['countryId'].setValue(addressInfo.countryId);
          this.f['provinceState'].setValue(addressInfo.provinceState);
          this.f['zipCode'].setValue(addressInfo.zipCode);
        }
      });
  }

  //save Edit button
  saveUpdate() {
    console.log("new data ", this.editAddressInformationForm.value)
    this.submitted = true;
    if (this.editAddressInformationForm.invalid) return;
    const submittedData = this.editAddressInformationForm.value;
    if (this.stateMode === editCompState.EditSectionState) {
      this.apiSer
        .put(APIs.profile.EditAddressInformation
          , submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe((res) => {
          if (!res.isError) {
            this.snakSer.snack('Info Updated Successfully');
            this._router.navigate(['/profile/address'])
            this.authService.userProfileData$.next({
              ...this.currentUser,
              addressInfo: submittedData
            });
          } else {
            this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'));
          }
        });
    } else {
      this.sendEvent.emit(submittedData)
    }

  }
}
