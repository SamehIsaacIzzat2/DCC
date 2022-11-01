import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { PlatformService } from 'src/app/SharedModule/Services/platform.service';
import { LoginModel } from './login.model';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginModel]
})

export class LoginComponent implements OnDestroy {
  banner: iBanner = {
    title:this.translate.instant('shared.actions.login'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translate.instant('shared.actions.login'), link: '/identity/register' }, 
      ],
    show:true
  }
  passwordVisibility: boolean = false
  constructor(public model: LoginModel, public langSer:LanguageService,public translate:TranslateService,public platformSer:PlatformService) { }
  ngOnDestroy(): void {
    this.model.endSubs();
  }


  togglePasswordVisibilty() {
    this.passwordVisibility = !this.passwordVisibility
  }

}
