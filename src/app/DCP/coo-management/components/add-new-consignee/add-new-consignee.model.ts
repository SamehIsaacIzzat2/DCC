import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';

@Injectable()
export class AddNewConsigneeModel {
  //*********************************Data****************************** */
  public consigneeForm: FormGroup;
  public submitted: boolean = false;
  public searchCountryField = SearchCountryField;
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedArabEmirates,
    CountryISO.Egypt,
    CountryISO.SaudiArabia,
  ];
  public allCountries: any[] = [];
  public allCities: any[] = [];
  public endSub$ = new Subject();

  //*********************************mock data****************************** */
  public consigneeTypes: any[];

  //*********************************constructor****************************** */
  constructor(
    private formBulider: FormBuilder,
    private lookupSer: LookupService,
    private apiSer: APICallerService
  ) {
    this.initForm();
    this.getSelectData();
  }
  //*********************************Logic****************************** */

  get f(): { [key: string]: AbstractControl } {
    return this.consigneeForm.controls;
  }

  private initForm() {
    this.consigneeForm = this.formBulider.group({
      consigneeName: ['', [Validators.required]],
      consigneeType: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      addressLine1: [''],
      addressLine2: [''],
      poBox: [''],
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      fax: [''],
    });
  }

  private getSelectData() {
    this.lookupSer
      .getCountries()
      .pipe(takeUntil(this.endSub$))
      .subscribe((countriesRes) => {
        this.allCountries = countriesRes;
      });

    this.lookupSer
      .getConsigneeTypes()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.consigneeTypes = result;
      });
  }

  public selectRelatedCities(data: any) {
    //to make sure user select country

    // this.selectContryFlag=true;
    let countryId = data.value;
    // call APi to return ralated city
    this.getCountryCities(countryId);
  }

  private getCountryCities(countries: any) {
    if (countries) {
      this.apiSer
        .get(APIs.lookups.citys + '/' + countries)
        .pipe(takeUntil(this.endSub$))
        .subscribe((res) => {
          if (!res.isError) {
            this.allCities = res.result;
          }
        });
    }
    this.allCities = [];
    return;
  }
}
