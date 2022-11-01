import { EditSocialInfoComponent } from './components/edit-social-info/edit-social-info.component';
import { EditCommunicationSettingComponent } from './components/edit-communication-setting/edit-communication-setting.component';
import { EditContactInfoComponent } from './components/edit-contact-info/edit-contact-info.component';
import { EditGeneralInfoComponent } from './components/edit-general-info/edit-general-info.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { SocialInfo } from './../../../profile/interfaces/interfaces';
import { CommunicationSettingComponent } from './components/communication-setting/communication-setting.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfilePageComponent } from './company-profile-page.component';

const routes: Routes = [
  {path:"",component:CompanyProfilePageComponent,children:[
    { path: '', redirectTo: 'general' },
    {  path: 'general', component: GeneralInfoComponent
    },
    { path: 'address', component: ContactInfoComponent },
    { path: 'contact', component: CommunicationSettingComponent },
    { path: 'social', component: SocialInfoComponent },
    { path: 'general/edit', component: EditGeneralInfoComponent, pathMatch: 'full' },
    { path: 'address/edit', component: EditContactInfoComponent, pathMatch: 'full' },
    { path: 'contact/edit', component: EditCommunicationSettingComponent, pathMatch: 'full' },
    { path: 'social/edit', component: EditSocialInfoComponent, pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
