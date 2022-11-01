import { ProfileModule } from './../profile.module';
import { SharedModule } from './../../SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteProfilePageComponent } from './page/complete-profile-page/complete-profile-page.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ProfileCompletedSuccessComponent } from './components/profile-completed-success/profile-completed-success.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CompleteProfilePageComponent,
    PreviewComponent,
    ProfileCompletedSuccessComponent
  ],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,SharedModule,ProfileModule,TranslateModule
  ]
})
export class CompleteProfileModule { }
