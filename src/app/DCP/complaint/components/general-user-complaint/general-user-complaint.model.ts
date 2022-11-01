import { lookupInterfcae } from './../../../../SharedModule/Interfaces/lookup.interface';
import { LookupService } from './../../../../SharedModule/Services/lookup.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, BehaviorSubject, observable, Observable } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class generalcomplaintPageModel {

  //======================Data====================
  endSub$ = new Subject();
  generalComplaintForm: FormGroup;
  submitted:boolean = false;
  public preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.Egypt, CountryISO.SaudiArabia,];
  public searchCountryField = SearchCountryField;
  public complaintTypes :lookupInterfcae[] = [];

  //=================Constructor==================
  constructor(
    private apiSer: APICallerService,
    public authSer: AuthenticationService, private fb: FormBuilder,
    private snakSer:SnackService,
    private lookupSer:LookupService,
    public translate:TranslateService
  ) {
    this.initForm();
    this.getSelectData()
  }
  // complaintType: [{ value: null, disabled: true }],
  initForm() {
    this.generalComplaintForm = this.fb.group({
      name: [null, Validators.required],
      email: [
        null,
        [ Validators.required,
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ],
      ],
      description: [null, Validators.required],
      complaintType: [null,Validators.required],
      phoneNumber: [null,Validators.required]
    });
  }


  public getSelectData(){
    const complaintTypes$ = this.lookupSer.getComplaintTypes();
    combineLatest(complaintTypes$)
      .pipe(takeUntil(this.endSub$)).subscribe(([complaintTypes]) => {
        if (complaintTypes) {
          this.complaintTypes = complaintTypes;
          this.f['complaintType'].setValue(this.complaintTypes[0].id)
        }
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.generalComplaintForm.controls;
  }

  sendComplaint(){
    this.submitted = true;
    if (this.generalComplaintForm.invalid) return;
    const submittedData = {
      ...this.generalComplaintForm.value,
      phoneNumber: this.f['phoneNumber'].value ? this.f['phoneNumber'].value.internationalNumber : null
    };
    this.apiSer.post(APIs.complaint.sendGeneralComplaint, submittedData).pipe(takeUntil(this.endSub$)).subscribe((res)=>{
      if(!res.isError){
        this.submitted = false;
        this.generalComplaintForm.reset();
        this.f['complaintType'].setValue(this.complaintTypes[0].id)
        this.snakSer.snack(`${this.translate.instant("shared.generalWord.submittedsuccessfully")}, ${this.translate.instant("shared.generalWord.referenceID")}: ${res.result.referenceId}`)
        // this.snakSer.snack(`Submitted successfully`)
      } else {
        this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))

      }
    })
  }


  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }


  public get isAuthenticated(): Observable<boolean> {
    return this.authSer.isAuthenticated.asObservable()
  }

}
