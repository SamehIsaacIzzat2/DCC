import { CompanyService } from './../../services/company.service';
import { compCommunicationSettinggs, companyInterface } from './../../interfaces/company.interface';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, combineLatest, Observable } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditCommunicationCompanyInformationModel {
  //=====================Data=========================
  public communicationInformationForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public nationalities: any[];
  public sendEvent: EventEmitter<compCommunicationSettinggs | null> = new EventEmitter();
  public filteredOptionsEmail: Observable<any[]>;
  public filteredOptionsSMS: Observable<any[]>;
  public selectedSmsRecs:any[] = [];
  public selectedMailRecs:any[] = [];
  public currentImage: string = '';
  public stateMode: editCompState = 1;
  public preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.Egypt, CountryISO.SaudiArabia,];
  public searchCountryField = SearchCountryField;
  public jobTitles = [{ id: "1", name: "bla bla" }];
  currentData: companyInterface;
  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private compSer:CompanyService,
    private _location: Location,
    private translate:TranslateService
  ) {
    this.initForm();
    this.getSelectData();
  }

  // init data in form
  initForm() {
    this.communicationInformationForm = this.fb.group({
      emailReceivers: [null, [Validators.required]],
      smsReceivers: [null, [Validators.required]]
    });
  }
  // get All Look up feilds
  getSelectData() {
    // const jobTitles = this.lookupSer.getTitles()
    // const nationalities = this.lookupSer.getNatioanlities();
    // combineLatest([jobTitles, nationalities])
    //   .pipe(takeUntil(this.endSub$))
    //   .subscribe(([jobs, nations]) => {
    //     this.jobTitles = jobs;
    //     this.nationalities = nations;
    //     this.setValues();
    //   });
  }
  // set intial data
  setValues() {
    this.compSer.companyDetails$
      .pipe(takeUntil(this.endSub$))
      .subscribe((companyProfile: companyInterface | null) => {
        if (companyProfile) {
          this.currentData = companyProfile;
          const communicationInfo: compCommunicationSettinggs = companyProfile.communicationSetting;
          // this.f['title'].setValue(generalInfo.title);
        }
      });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.communicationInformationForm.controls;
  }

  public removeOpt(arr: any[], opt: any) {
    arr.splice(
      arr.findIndex((ele) => ele.id == opt.id),
      1
    );
  }
  public addOpt(arr: any[], controlsName: string, opt: any) {
    if (
      arr.indexOf(opt) == -1 &&
      arr.find((ele) => ele.id == opt.id) == undefined
    ) {
      arr.push(opt);
    } else {
      this.snakSer.snack(`${opt.name} is already added`);
    }
  }



  saveUpdate() {
    this.submitted = true;
    if (this.communicationInformationForm.invalid) return;
    const submittedData: compCommunicationSettinggs = this.communicationInformationForm.value;
    if (this.stateMode === editCompState.EditSectionState) {
      const apiPath = `${APIs.Companys.editCommunicationSettings}/${this.currentData.id}`;
      this.apiSer
        .put(apiPath, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: (res) => {
            if (!res.isError && res.result && res.result.isSuccedded) {
              this.snakSer.snack(this.translate.instant('shared.generalWord.updatedInfo'));
              this.compSer.companyDetails$.next({
                ...this.currentData,
                communicationSetting: submittedData
              });
              this._location.back();
            }
          },
          error: () => {
            this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))
          }
        });
    } else {
      this.sendEvent.emit(submittedData)
    }

  }

  public endsubs() {
    this.endSub$.next("");
    this.endSub$.complete()
  }
}
