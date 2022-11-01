import { TranslateModule } from '@ngx-translate/core';
import { CompanyProfileModule } from './../company-profile/company-profile.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyPageComponent } from './add-company-page.component';
import { CompanyAddSuccessComponent } from './components/company-add-success/company-add-success.component';
import { CompanyAddPreviewComponent } from './components/company-add-preview/company-add-preview.component';

const routes:Routes = [
  {path:"register",component:AddCompanyPageComponent},
  { path:"success",component:CompanyAddSuccessComponent}
]

@NgModule({
  declarations: [
    AddCompanyPageComponent,
    CompanyAddSuccessComponent,
    CompanyAddPreviewComponent
  ],
  imports: [
    CommonModule, CompanyProfileModule,SharedModule,RouterModule.forChild(routes),TranslateModule
  ]
})
export class AddCompanyModule { }
