import { lookupInterfcae } from './../../../../../SharedModule/Interfaces/lookup.interface';
import { CompanyService } from './../../services/company.service';
import {
  compAddressInfo,
  companyInterface,
} from './../../interfaces/company.interface';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Location } from '@angular/common';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditContactCompanyInformationModel {
  //=====================Data=========================
  public contactInformationForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public nationalities: any[];
  public sendEvent: EventEmitter<compAddressInfo | null> = new EventEmitter();
  public stateMode: editCompState = 1;
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedArabEmirates,
    CountryISO.Egypt,
    CountryISO.SaudiArabia,
  ];
  public searchCountryField = SearchCountryField;
  public jobTitles = [{ id: '1', name: 'bla bla' }];
  currentData: companyInterface;
  countries: lookupInterfcae[] = [];
  cities: any[] = [];
  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private compSer: CompanyService,
    private _location: Location,
    private translate:TranslateService
  ) {
    this.initForm();

  }

  // init data in form
  initForm() {
    this.contactInformationForm = this.fb.group({
      address: [null],
      countryId: [null, Validators.required],
      cityId: [null],
      provinceState: [null],
      zipCode: [null],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ],
      ],
      phoneNumber: [null, Validators.required],
    });
  }
  // get All Look up feilds
  getSelectData() {
    const countries$ = this.lookupSer.getCountries();
    // const cities$ = this.lookupSer.getCities();
    combineLatest([countries$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([countries]) => {
        this.countries = countries;
        // this.cities = cities;
        if (this.stateMode !== editCompState.SteeperStatte)  this.setValues()
      });
  }
  // set intial data
  setValues() {
    this.compSer.companyDetails$
      .pipe(takeUntil(this.endSub$))
      .subscribe((companyProfile: companyInterface | null) => {
        if (companyProfile) {
          this.currentData = companyProfile;
          const contactInfo: compAddressInfo =
            companyProfile.addressAndContactInfo;
          console.log(contactInfo)

          this.f['address'].setValue(contactInfo.address);
          this.f['countryId'].setValue(contactInfo.countryId);
          if (!contactInfo.cityId && contactInfo.countryId !=null) {
            this.getCitiesByCountryId(contactInfo.countryId)
          }
          this.f['cityId'].setValue(contactInfo.cityId);
          this.f['provinceState'].setValue(contactInfo.provinceState);
          this.f['zipCode'].setValue(contactInfo.zipCode);
          this.f['email'].setValue(contactInfo.email);
          this.f['phoneNumber'].setValue(contactInfo.phoneNumber);

        }
      });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.contactInformationForm.controls;
  }

  getCitiesByCountryId(countryId:string){
      this.lookupSer.getCitiesByCountryId(countryId).pipe(takeUntil(this.endSub$)).subscribe((cities)=>{
        this.cities = cities;
      })
  }

  saveUpdate() {
    this.submitted = true;
    if (this.contactInformationForm.invalid) return;
    const submittedData: compAddressInfo = {
      ...this.contactInformationForm.value,
      phoneNumber: this.f['phoneNumber']?.value?.internationalNumber,
    };
    if (this.stateMode === editCompState.EditSectionState) {
      const apiPath = `${APIs.Companys.editContactInfo}/${this.currentData.id}`;
      this.apiSer
        .put(apiPath, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: (res) => {
            if (!res.isError && res.result && res.result.isSuccedded) {
              this.snakSer.snack('Info Updated Successfully');
              this.compSer.companyDetails$.next({
                ...this.currentData,
                addressAndContactInfo: submittedData,
              });
              this._location.back();
            }
          },
          error: () => {
            this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))
          },
        });
    } else {
      this.sendEvent.emit(submittedData);
    }
  }

  public endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
