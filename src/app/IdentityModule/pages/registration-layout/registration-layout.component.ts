import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-registration-layout',
  templateUrl: './registration-layout.component.html',
  styleUrls: ['./registration-layout.component.scss']
})
export class RegistrationLayoutComponent implements OnInit {

  RegisterBannerData: iBanner = {
    title: this.translate.instant('bannerData.breadCrump.registration'),
    breadCrump: [
      { title:this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title:this.translate.instant('bannerData.breadCrump.registration'), link: '/services' },
      ],
      show:true
  }
  verificationBannerData: iBanner = {
    title:this.translate.instant('registration.registrationVerification.verificationCard.Verification'),
    breadCrump: [
      { title:this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title:this.translate.instant('bannerData.breadCrump.newAccount'), link: '/identity/register' },
     ],
     show:true
  }

  // ====================data for verification Page ===================

  tempLinkForTest=localStorage.getItem("tempLink");
  tempOTP=localStorage.getItem("OTPCode");
  item: any = {
    icon: 'done',
    title: this.translate.instant('registration.registrationVerification.verificationCard.title'),
    btnConfig: {
      text:this.translate.instant('registration.registrationVerification.verificationCard.btnText'),

      url: ['/identity', 'completeRegistration'],
  }
   
  }

  constructor( public router:Router ,public translate:TranslateService) { }

  ngOnInit(): void {
  }

}
