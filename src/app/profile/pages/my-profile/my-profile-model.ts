import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { takeUntil, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MyProfileModel {
  public endSub$ = new Subject();
  //================================data================================
  public banner: iBanner = {
    title:this.translate.instant('profileModule.myProfile'),
    breadCrump: [
      { title:this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title:this.translate.instant('profileModule.myProfile'), link: '/profile/general' }, 
              ],
  
  };
  public allInformationLinks: any[] = [
    {
      title:this.translate.instant('profileModule.sideLinks.generalInfo'),
      url: ['/profile', 'general'],
    },
    {
      title:this.translate.instant('profileModule.sideLinks.addressInfo'),
      url: ['/profile', 'address'],
    },
    {
      title:this.translate.instant('profileModule.sideLinks.contactInfo'),
      url: ['/profile', 'contact'],
    },
    {
      title:this.translate.instant('profileModule.sideLinks.socialInfo'),
      url: ['/profile', 'social'],
    },
  ];
  constructor(
    public router: Router,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private authSer:AuthenticationService,
    public translate:TranslateService
  ) {

  }

  //===================================logic=================================


  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
