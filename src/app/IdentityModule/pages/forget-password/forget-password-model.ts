import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { TokenService } from "src/app/CallerModule/Services/token.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { SnackService } from "src/app/SharedModule/Services/snack.service";
import { userNameMatch } from "src/app/SharedModule/validators/userNameValidators";

@Injectable()
export class ForgetPasswordModel {
    // ===========================data===============
    public forgetPasswordBannerData: iBanner = {
        title: this.translate.instant('Login.forgetPass'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translate.instant('Login.forgetPass'), link: '/identity/register' }, 
      ],
      show:true
    }
    public item: any = {
        icon: 'done',
        title: this.translate.instant('Login.changePassVerification'),

    }
    // Making Multiple Pattern  for test UserName
    // <!-- pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" -->

    private emailPattren: RegExp = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    private emirateIDPattren: RegExp = /^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$/;
    private emirateIDPattrenWithoutMask: RegExp = /^784?[0-9]{4}?[0-9]{7}?[0-9]{1}$/;
    private passportPattren: RegExp = /^[0-9]{1,}$/;
    // private unifiedPattren: RegExp = /^[0-9]{6}$/;

    public forgotPasswordForm: FormGroup;
    public submitted = false;
    private endSub$ = new Subject();
    public verificationFlag: boolean = false;
    public recapcha: string = '';

    fakeLink: any = '';   // will removed after finish devolpmet

    constructor(public formBuilder: FormBuilder, public router: Router, private apiCaller: APICallerService, private snakSer: SnackService,public translate:TranslateService) {
        this.createForm();
    }
    //=======================logic==========================
    get f(): { [key: string]: AbstractControl } {
        return this.forgotPasswordForm.controls;
    }

    // recapcha handler
    resolved(captchaResponse: string) {
        this.recapcha = captchaResponse;
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    createForm() {
        this.forgotPasswordForm = this.formBuilder.group({
            userName: [null, [Validators.required, userNameMatch([this.emailPattren,this.passportPattren, this.emirateIDPattren,this.emirateIDPattrenWithoutMask])]],
        });
    }

    confirmMail() {
        this.submitted = true
        console.log(this.forgotPasswordForm.value);

        if (this.forgotPasswordForm.invalid) return;

        let userData = {
            emailOrEmiratesIdOrPassportOrUnifiedIdOrPhone: this.forgotPasswordForm.get("userName")?.value,
            resetPasswordUrl: this.apiCaller.domain + "identity/resetPassword",
        }

        if (this.recapcha != '') {
            this.apiCaller.post(APIs.Account.SendPasswordResetCode, userData).pipe(takeUntil(this.endSub$)).subscribe(res => {
                if (!res.isError) {

                    if (res.result.isSuccessed) {
                        this.fakeLink = res.result.resetPassordUrlForDevelpmentWillRemoved;
                        this.verificationFlag = true;

                    }
                    console.log(res)
                    //    localStorage.setItem("CurrentUserToken",res.result.token);
                    //    this.router.navigate(['/identity','createPassword'],{queryParams:{token:res.result.token,userId:res.result.userId}});
                }
                // else {
                //     this.snakSer.snack("Unknown Error");
                // }
            })
        } else {
            this.snakSer.snack("Check the Check box");
        }

        // this.router.navigate(['/identity','resetPassword']);

    }


    public endSubs() {
        this.endSub$.next("");
        this.endSub$.complete();
    }
}



