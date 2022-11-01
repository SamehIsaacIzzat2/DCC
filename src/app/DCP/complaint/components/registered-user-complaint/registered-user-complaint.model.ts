import { LookupService } from './../../../../SharedModule/Services/lookup.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, BehaviorSubject, observable, Observable, startWith, map } from 'rxjs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { RequireMatch } from 'src/app/SharedModule/validators/exactMatch';
import { TranslateService } from '@ngx-translate/core';

export enum complaintState {
  General = 1,
  Services = 2,
  Events = 3
}

@Injectable()
export class registeredcomplaintPageModel {

  //======================Data====================
  endSub$ = new Subject();
  ComplaintForm: FormGroup;
  public complaintType: complaintState | null = complaintState.General;
  submitted: boolean = false;
  public preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.Egypt, CountryISO.SaudiArabia,];
  public searchCountryField = SearchCountryField;
  complaintTypes: {id:string,name:string}[];
  eventNames:{id:string,name:string}[]=[];
  reqNums: { id: string, name: string }[]=[];
  public filteredServicesOptions: Observable<any[] | null>;
  public filteredEventsOptions: Observable<any[] | null>;

  //=================Constructor==================
  constructor(
    private apiSer: APICallerService,
    private router: Router,
    public authSer: AuthenticationService, private fb: FormBuilder,
    private snakSer: SnackService,
    private lookupSer:LookupService,
    public translate:TranslateService
  ) {
    this.initForm();
    this.getSelectData();
    this.filteredOptions()
  }
  filteredOptions() {
    this.filteredServicesOptions = this.ComplaintForm.controls['requestNumber'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.reqNums, value || '')),
    );
    this.filteredEventsOptions = this.ComplaintForm.controls['eventName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.eventNames, value || '')),
    );
  }
  getSelectData() {
    const complaintTypes$ = this.lookupSer.getComplaintTypes();
    const eventNames$ = this.lookupSer.getEventNames();
    const ReqNums$ = this.lookupSer.getReqNums();
    combineLatest(complaintTypes$, eventNames$, ReqNums$)
    .pipe(takeUntil(this.endSub$)).subscribe(([complaintTypes,evtNames,reqNums])=> {
      if (complaintTypes){
        this.complaintTypes = complaintTypes;
      }
      if (evtNames) {
        this.eventNames = evtNames
      }
      if (reqNums) {
        this.reqNums = reqNums
      }
    })
  }
  initForm() {
    this.ComplaintForm = this.fb.group({
      complaintType: [null, Validators.required],
      description: [null, Validators.required],
      requestNumber: [null],
      eventName: [null],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ComplaintForm.controls;
  }

  public handleComplaintType(event:Event){
    const selectVal = (event.target as HTMLSelectElement).value;
    if(selectVal && selectVal !== "null"){
      if(this.complaintType !== +selectVal) {
        //reset fields on complaint type change
        this.f['requestNumber'].reset();
        this.f['eventName'].reset();
      }
      this.complaintType = +selectVal;
      // adjust validation
      this.adjustValidation()
      return;
    }
    this.complaintType = null;

  }
  private adjustValidation(){
    const makeFieldRequired = (formControl: AbstractControl, removedValidations: AbstractControl) => {
      formControl.addValidators([Validators.required, RequireMatch]);
      formControl.updateValueAndValidity()
      removedValidations.removeValidators([Validators.required, RequireMatch]);
      removedValidations.updateValueAndValidity()
    }
    if (this.getEventsComplaint()) makeFieldRequired(this.f['eventName'], this.f['requestNumber'])
    else if (this.getServiceComplaint()) makeFieldRequired(this.f['requestNumber'], this.f['eventName'])
    else {
      // in case neither services nor events selected remove validation from both
      this.f['eventName'].removeValidators([Validators.required, RequireMatch]);
      this.f['eventName'].updateValueAndValidity()
      this.f['requestNumber'].removeValidators([Validators.required, RequireMatch]);
      this.f['requestNumber'].updateValueAndValidity()
    }
  }

  sendComplaint() {
    this.submitted = true;
    console.log(this.ComplaintForm)
    if (this.ComplaintForm.invalid || this.f['complaintType'].value === 'null') return;
    const submittedData = {
      ...this.ComplaintForm.value,
      eventName: this.f['eventName'].value ? this.f['eventName'].value.id : null,
      requestNumber: this.f['requestNumber'].value ? this.f['requestNumber'].value.id : null
    };
    this.apiSer.post(APIs.complaint.sendRegisteredComplaint, submittedData).pipe(takeUntil(this.endSub$)).subscribe((res) => {
      if (!res.isError) {
        this.submitted = false;
        this.complaintType = null;
        this.ComplaintForm.reset();
        this.snakSer.snack(`${this.translate.instant("shared.generalWord.submittedsuccessfully")}, ${this.translate.instant("shared.generalWord.referenceID")}: ${res.result.referenceId}`)
      } else {
        this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))
      }
    })
  }

  public getServiceComplaint(){
    return this.complaintType === complaintState.Services
  }
  public getEventsComplaint(){
    return this.complaintType === complaintState.Events
  }

  private _filter(arr: any[], value: any): string[] | null {

    if (arr && arr.length > 0 && typeof(value)==='string') {
      const filterValue = value.toLowerCase();
      return arr.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    return null;
  }


  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }

}
