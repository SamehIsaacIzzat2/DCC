import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './services/company.service';
import { AngularMaterialModule } from './../../../AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { EditGeneralInfoComponent } from './components/edit-general-info/edit-general-info.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { EditContactInfoComponent } from './components/edit-contact-info/edit-contact-info.component';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { EditSocialInfoComponent } from './components/edit-social-info/edit-social-info.component';
import { CommunicationSettingComponent } from './components/communication-setting/communication-setting.component';
import { EditCommunicationSettingComponent } from './components/edit-communication-setting/edit-communication-setting.component';
import { CompanyProfilePageComponent } from './company-profile-page.component';

@NgModule({
  declarations: [
    GeneralInfoComponent,
    EditGeneralInfoComponent,
    ContactInfoComponent,
    EditContactInfoComponent,
    SocialInfoComponent,
    EditSocialInfoComponent,
    CommunicationSettingComponent,
    EditCommunicationSettingComponent,
    CompanyProfilePageComponent,
  ],
  imports: [
    CommonModule,TranslateModule,
    CompanyProfileRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, AngularMaterialModule
  ],
  exports: [
    GeneralInfoComponent,
    EditGeneralInfoComponent,
    ContactInfoComponent,
    EditContactInfoComponent,
    SocialInfoComponent,
    EditSocialInfoComponent,
    CommunicationSettingComponent,
    EditCommunicationSettingComponent,
  ]
})
export class CompanyProfileModule {
}
