import { RequireMatch } from 'src/app/SharedModule/validators/exactMatch';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { EventRegisterData } from './interfaces';
import { RegisterEvent } from './registerevent.interface';
import { EventActionServiceService } from '../event-card/event-action-service.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class RegisterEventModel {
  //=====================Data=========================
  public registerForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public nationalities: any[] = [];
  public mode: string = "form"
  public registerEvent:RegisterEvent;
  public eventId:string;
  public eventAction:boolean;

  //===========================FormData=================================
  public preferredCountries: CountryISO[] = [ CountryISO.UnitedArabEmirates, CountryISO.Egypt,CountryISO.SaudiArabia,];
  public searchCountryField = SearchCountryField;
  //=====================Constructor==================
  constructor(private fb: FormBuilder,
    private apiSer: APICallerService,
     private authService: AuthenticationService,
     private snakSer: SnackService,
     public router: Router,
     public route :ActivatedRoute,
     public translate:TranslateService,
     )
     {
    this.initForm();
    this.getSelectData();

    // catch prams from Url to send with reqistered Data
    this.route.queryParams.subscribe(
      (prams:Params) =>{
        this.eventId=prams.id;
        this.eventAction=prams.isSuccess;
      }
    )
  }
  getSelectData() {
  this.apiSer.get(APIs.lookups.nationalities).subscribe(
    (res) =>{
        if(!res.isError){
            this.nationalities = res.result;
        }
    }
  )

  }
  initForm() {
    // Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]{2,3}$')
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      nationality: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) ]],
      phone: [null, [Validators.required]],
    });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public register() {
    console.log(this.registerForm)
    this.submitted = true
    let phoneNumber = this.registerForm.controls["phone"].value;
  // if data invalid i will not compelet the steps
    if (this.registerForm.invalid) return;

  //prepare Data for sending in Api
    let userData: EventRegisterData = {
      email: this.registerForm.controls["email"]?.value,
      phoneNumber: phoneNumber.e164Number,
      firstName: this.registerForm.controls["firstName"]?.value,
      lastName: this.registerForm.controls["lastName"]?.value,
      nationality: this.registerForm.controls["nationality"]?.value,
      eventId:this.eventId,
      isAccept:this.eventAction
    };

      this.RegisterPost(userData);
  }

  RegisterPost(userData:EventRegisterData) {
    console.log("from RegisterPost",userData)
    this.apiSer.showLoader();
    let eventfill = APIs.Events.eventfill;

    const mycompanys$ = this.apiSer.post(eventfill, userData,false).pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$]).pipe(takeUntil(this.endSub$)).
        subscribe(([details]) => {
            this.apiSer.hideLoader();
            if (!details.isError) {
              if (details.result.isSucceed) {
                this.router.navigate(['/dcc/events'],{queryParams:{attendeeMail:this.registerForm.controls["email"]?.value}});
                // this.snakSer.snack("Registered Succefully");

              }
              else
              {
                this.snakSer.snack(this.translate.instant("registration.registrationForm.registerationFailed"));
              }
            }
        })
}

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }
}
