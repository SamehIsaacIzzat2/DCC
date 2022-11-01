import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SharedModule } from '../SharedModule/shared.module';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { AddressInformationComponent } from './components/address-information/address-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { SocialInformationComponent } from './components/social-information/social-information.component';
import { EditAddressInformationComponent } from './components/edit-address-information/edit-address-information.component';
import { EditGeneralInformationComponent } from './components/edit-general-information/edit-general-information.component';
import { EditContactInformationComponent } from './components/edit-contact-information/edit-contact-information.component';
import { EditSocialInformationComponent } from './components/edit-social-information/edit-social-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../AngularMaterialModule/angularMaterialModule.module';
import { APIs } from '../CallerModule/Data/APIs';
import { takeUntil } from 'rxjs';
import { InputMaskModule } from '@ngneat/input-mask';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyProfileComponent,
    GeneralInformationComponent,
    AddressInformationComponent,
    ContactInformationComponent,
    SocialInformationComponent,
    EditAddressInformationComponent,
    EditGeneralInformationComponent,
    EditContactInformationComponent,
    EditSocialInformationComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    TranslateModule
  ],
  exports:[
    EditAddressInformationComponent,
    EditGeneralInformationComponent,
    EditContactInformationComponent,
    EditSocialInformationComponent,
    GeneralInformationComponent,
    AddressInformationComponent,
    ContactInformationComponent,
    SocialInformationComponent,
  ]
})
export class ProfileModule {

  constructor(private apiSer: APICallerService, private authSer:AuthenticationService){
    this.getProfileData();
  }
  getProfileData() {
    this.apiSer
      .get(APIs.profile.GetData)
      .subscribe((res) => {
        if (!res.isError) {
          console.log("from module",res)
          this.authSer.userProfileData$.next(res.result);
        }
      });
  }

}
