import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressInformationComponent } from './components/address-information/address-information.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { EditAddressInformationComponent } from './components/edit-address-information/edit-address-information.component';
import { EditContactInformationComponent } from './components/edit-contact-information/edit-contact-information.component';
import { EditGeneralInformationComponent } from './components/edit-general-information/edit-general-information.component';
import { EditSocialInformationComponent } from './components/edit-social-information/edit-social-information.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { SocialInformationComponent } from './components/social-information/social-information.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

const routes: Routes = [

  {
    path: '', component: MyProfileComponent, children: [

      { path: '', redirectTo: 'general' },
      {
        path: 'general', component: GeneralInformationComponent
      },
      { path: 'address', component: AddressInformationComponent },
      { path: 'contact', component: ContactInformationComponent },
      { path: 'social', component: SocialInformationComponent },
      { path: 'general/edit', component: EditGeneralInformationComponent, pathMatch: 'full' },
      { path: 'address/edit', component: EditAddressInformationComponent, pathMatch: 'full' },
      { path: 'contact/edit', component: EditContactInformationComponent, pathMatch: 'full' },
      { path: 'social/edit', component: EditSocialInformationComponent, pathMatch: 'full' },
    ]
  },
  {
    path:"complete-profile",
    loadChildren : ()=> import("./complete-profile/complete-profile.module").then((m)=>m.CompleteProfileModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
