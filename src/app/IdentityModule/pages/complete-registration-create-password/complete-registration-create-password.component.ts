import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-complete-registration-create-password',
  templateUrl: './complete-registration-create-password.component.html',
  styleUrls: ['./complete-registration-create-password.component.scss']
})
export class CompleteRegistrationCreatePasswordComponent implements OnInit {

  completeRegistrationBannerData:iBanner = {
    title:this.translate.instant('registration.compeletRegistration.compeletRegistration'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translate.instant('bannerData.breadCrump.registration'), link: '/identity/register' }, 
      ],
    show:true
  }
  constructor(public translate:TranslateService) { }

  ngOnInit(): void {
  }

}
