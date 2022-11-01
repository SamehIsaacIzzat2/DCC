import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";

@Injectable()
export class ResetPasswordModel {

    //=========================Data=================================

    public verificationFlag: boolean = false;
    public resetPasswordFlag:boolean=false;
    public resetPasswordForm: FormGroup;
    public passwordVisibility: boolean = false
    public passwordConfirmationVisibility: boolean = false
    public submitted: boolean = false;
    public resetPasswordBannerData: iBanner = {
        title: this.translate.instant('Login.resetPassword'),
        breadCrump: [
          { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
          { title: this.translate.instant('Login.resetPassword'), link: '/identity/register' },
          ],
          show:true
        // title: "Reset Password",
        // breadCrump: [
        //     { title: "Home", link: '/services' },
        //     { title:"Reset Password" },
        //     ],
    }

    public item: any = {
        icon: 'done',
      title: this.translate.instant("registration.registrationVerification.verificationCard.title2"),
        btnConfig: {
          text: this.translate.instant("registration.registrationVerification.verificationCard.btnTxt2"),
            url: ['/identity', 'resetPassword'],
        }
    }

    public resetPassworditem:any ={
        icon: 'done',
      title: this.translate.instant("registration.success.yourPasswordChangedSuccessfuly"),
        btnConfig: {
          text: this.translate.instant("registration.success.backtoLogin"),
            url: ['/identity', 'login'],
        }
    }

    constructor(public formBuilder: FormBuilder,public translate:TranslateService) {

    }


    //========================logic=================================
    goToEnterNewPassword() {
        this.verificationFlag = false;
    }

    showVerification(data:any){
        this.verificationFlag=true;
    }



}
