import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/SharedModule/shared.module';

import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComapnysPageComponent } from './pages/list-comapnys-page/list-comapnys-page.component';
import { ListComapnysComponent } from './components/list-comapnys/list-comapnys.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { CompanyWidgetComponent } from './components/company-widget/company-widget.component';

@NgModule({
  declarations: [
    ListComapnysPageComponent,
    ListComapnysComponent, CompanyFilterComponent, CompanyWidgetComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,TranslateModule

  ],
})
export class CompanyManagementModule {}
