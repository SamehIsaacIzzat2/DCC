import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from './../../AngularMaterialModule/angularMaterialModule.module';
import { SharedModule } from './../../SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesCatalogRoutingModule } from './services-catalog-routing.module';
import { BannerServiceDetailsComponent } from './components/banner-service-details/banner-service-details.component';
import { ServiceDirectoryComponent } from './components/service-directory/service-directory.component';
import { ServiceMembershipDetailsComponent } from './components/service-membership-details/service-membership-details.component';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { SerDetailsAsideComponent } from './components/ser-details-aside/ser-details-aside.component';
import { SurveyComponent } from './components/survey/survey.component';
import { BannerMembershipDetailsComponent } from'./components/banner-membership-details/banner-membership-details.component';
import { MembershipDetailsAsideComponent } from'./components/membership-details-aside/membership-details-aside.component';
@NgModule({
  declarations: [
    BannerServiceDetailsComponent,
    ServiceDirectoryComponent,
    SideFilterComponent,
    ServiceDetailsComponent,
    SerDetailsAsideComponent,
    SurveyComponent,
    ServiceMembershipDetailsComponent,
    BannerMembershipDetailsComponent,
    MembershipDetailsAsideComponent
  ],
  imports: [
    CommonModule,
    ServicesCatalogRoutingModule,SharedModule,AngularMaterialModule,TranslateModule
  ],
  exports: [
    BannerServiceDetailsComponent
  ]
})
export class ServicesCatalogModule { }
