import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { iRegiser } from './register.interface';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { Route, Router } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { RequireMatch } from 'src/app/SharedModule/validators/exactMatch';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RegisterFormModel {
  //=====================Data=========================
  public registerForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public jobTitles: any[] = [];
  public nationalities: any[] = [];
  public mode: string = "form"
  nationalityId: any;

  //===========================FormData=================================
  public preferredCountries: CountryISO[] = [ CountryISO.UnitedArabEmirates, CountryISO.Egypt,CountryISO.SaudiArabia,];
  public searchCountryField = SearchCountryField;
  //=====================Constructor==================
  constructor(private fb: FormBuilder, private apiSer: APICallerService, private authService: AuthenticationService, private snakSer: SnackService, public router: Router,public translate:TranslateService) {
    this.initForm();
    this.getSelectData();
  }
  getSelectData() {
    const jobTitles = this.apiSer.get(APIs.lookups.jobTitles);
    const nationalities = this.apiSer.get(APIs.lookups.nationalities);
    combineLatest([jobTitles, nationalities]).pipe().subscribe(
      ([jobs, nations]) => {
        this.jobTitles = jobs.result;
        // auto select first opt for title
        this.f['title'].setValue(this.jobTitles[0].id)
        this.nationalities = nations.result;
      }
    )
  }
  initForm() {
    this.registerForm = this.fb.group({
      title: ["", Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      nationality: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      phone: [null, [Validators.required]],
      emiratesId: [null, [ Validators.maxLength(18),Validators.minLength(18)]],
      unifiedID: [null,],
      passportNumber: [null],
    });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

   

  // setNationality(opt: any) {
  //   this.nationalityId = opt.id;
  // }

  public register() {
    console.log(this.registerForm);
    this.submitted = true
    let phoneNumber = this.registerForm.controls["phone"].value;
  // if data invalid i will not compelet the steps
    if (this.registerForm.invalid) return;
  // if user not Enter one of  [passportNumber-unifiedId-emiratesId] i will not compelet the steps
  if( this.registerForm.controls["emiratesId"].value == null && this.registerForm.controls["passportNumber"].value == null && this.registerForm.controls["unifiedID"].value == null
  ){
    this.snakSer.snack("You Must Enter at least one of [passportNumber-unifiedId-emiratesId] ");
    return;
  }

  //prepare Data for sending in Api
    let userData: iRegiser = {
      emailAddress: this.registerForm.controls["email"]?.value,
      phoneNumber: phoneNumber.e164Number,
      firstName: this.registerForm.controls["firstName"]?.value,
      lastName: this.registerForm.controls["lastName"]?.value,
      jobTitleId: this.registerForm.controls["title"]?.value,
      nationalityId: this.registerForm.controls["nationality"]?.value,
      passportNumber: this.registerForm.controls["passportNumber"]?.value,
      emiratesId: this.registerForm.controls["emiratesId"]?.value.replaceAll("-",""),
      unifiedId: this.registerForm.controls["unifiedID"]?.value,
      createPasswordUrl: this.apiSer.domain +'identity/createPassword',
    };
   //Call Api
    this.apiSer.post(APIs.Account.Register, userData).pipe(takeUntil(this.endSub$)).subscribe(res => {
      if (!res.isError) {
        localStorage.setItem("CurrentUserId",res.result.userId);

        // ??????????????????data will removed when compelet massage and otp sending????????????????????
        localStorage.setItem("tempLink",res.result.createPassordUrlForDevelpmentWillRemoved);
        localStorage.setItem("OTPCode",res.result.otpForDevelpmentWillRemoved);
        console.log(res.result);
        this.router.navigate(['/dcc/identity','verification']);



        // let loginData = {
        //   email: userData.emailAddress,
        //   password: userData.password
        // };
        // this.apiSer.post(APIs.Account.Login, loginData).pipe(takeUntil(this.endSub$)).subscribe(res => {
        //   if (!res.isError) {
        //     this.authService.setUser(res.result.token.accessToken, res.result.user);
        //     this.mode = "success";
        //     this.snakSer.snack("You have been logged in as " + userData.emailAddress);
        //     this.registerForm.reset();
        //   }
        // })

      }

      // this.registerForm.reset();
    })
  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }
}
