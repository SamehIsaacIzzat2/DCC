import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { CompleteRegistrationModel } from './complete-registration-model';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss'],
  providers:[CompleteRegistrationModel]
})
export class CompleteRegistrationComponent implements OnInit {

//================================Data=======================================
  completeRegistrationBannerData:iBanner = {
    title:this.translate.instant('registration.compeletRegistration.compeletRegistration'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translate.instant('bannerData.breadCrump.registration'), link: '/identity/register' }, 
      ],
    show:true
  }


  constructor(public router:Router ,public model:CompleteRegistrationModel,public translate:TranslateService) { }

  ngOnInit(): void {
  }

}
