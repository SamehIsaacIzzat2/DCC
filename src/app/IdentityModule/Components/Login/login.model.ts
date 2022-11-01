import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { SnackService } from './../../../SharedModule/Services/snack.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { ILoginUser } from "./iLogin";
import { TokenService } from './../../../CallerModule/Services/token.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { userNameMatch } from 'src/app/SharedModule/validators/userNameValidators';

@Injectable()
export class LoginModel {

  //======================Data====================
  public loginForm: FormGroup;
  public submitted: boolean = false;
  private isPasswordVisible: boolean = false;
  private endSub$ = new Subject();
  selectedServiceId: any;

  //===========================UEA-Login==========================
  uaeLoginFlag:boolean=false;

  // Making Multiple Pattern  for test UserName
  private emailPattren:RegExp = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  private emirateIDPattren: RegExp = /^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$/;
  private emirateIDPattrenWithoutMask: RegExp = /^784?[0-9]{4}?[0-9]{7}?[0-9]{1}$/;
  private passportPattren: RegExp = /^[0-9]{1,}$/;
  // private unifiedPattren: RegExp = /^[0-9]{6}$/;

  //=================Constructor==================
  constructor(private router: Router, private fb: FormBuilder, private apiCaller: APICallerService, private tokenService: TokenService, private authService: AuthenticationService, private snakSer: SnackService,private langSer:LanguageService) {
    this.createForm();
    this.selectedServiceId = this.router.getCurrentNavigation()?.extras?.state?.selectedServiceId;

  }
  //==========================Logic====================


  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public createForm() {
    this.loginForm = this.fb.group({
      // userName: [null, [Validators.required, Validators.pattern(`(${this.emailPattren}) | (${this.emirateIDPattren}) | (^[0-9]$)`)]],
      userName: [null, [Validators.required, userNameMatch([this.emailPattren,this.passportPattren ,this.emirateIDPattren,this.emirateIDPattrenWithoutMask])]],

      password: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!~@#$%^-_=+{}/;:,.?*])[A-Za-z0-9!~@#$%^-_=+{}/;:,.?*]{8,}$')]]

    });

  }

  // Login
  public login() {

    this.submitted = true
    if (this.loginForm.invalid) return;
    // this.router.navigate(["/requests"]);
    // if (!this.isFormValid()) return;
    let userData: ILoginUser = {
      emailOrEmiratesIdOrPassportOrUnifiedIdOrPhone: this.loginForm.get("userName")?.value,
      password: this.loginForm.get("password")?.value
    };
    this.apiCaller.post(APIs.Account.Login, userData).pipe(takeUntil(this.endSub$)).subscribe(

      (res) => {
        if (!res.isError) {
          this.authService.setUser(res.result.token.accessToken, res.result.user);
          if (res.result.isProfileCompleted) {
            if (this.selectedServiceId){
              this.router.navigate(["/dcc/services/details"])
            } else {
              this.router.navigate(["/dcc/requests"])
            }
          } else {
            this.snakSer.snack(this.langSer.toggleVal("You need to complete your profile","يرجي إتمام ملفك الشخصي"))
            this.router.navigate(["/dcc/profile/complete-profile"]);
          }
          // this.loginForm.reset();
        }
      },
    )

  }


  //Login with UAE-Path
  public signWithUaePass() {
    //prapare Query prametre which will sended to URL.
    let  Language='en';
    let  redirectUri=this.apiCaller.domain+"identity/redirect";

    //open loader
    this.uaeLoginFlag=true;

    //call Api that will take redirect page that user will enter After comming From UAE-pass
    this.apiCaller.get(APIs.Account.UAEPassCode +`?language=${Language}&redirectUri=${redirectUri}`).subscribe(
      (res)=>{
        console.log(res)
        if (!res.isError) {
          window.location.href=res.result.url;
        }
        // else{
        //   this.snakSer.snack("Unknown Error");
        // }
      }

    )


  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }
}
