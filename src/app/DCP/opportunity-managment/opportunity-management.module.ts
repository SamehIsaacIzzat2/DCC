import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/SharedModule/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfOpportunitiesComponent } from './pages/list-of-opportunity/list-of-opportunities.component';
import { OpportunityDirectoryComponent } from './components/opportunity-directory/opportunity-directory.component';
import { OpportunityManagementRoutingModule } from './opportunity-management-routing.module';
import { OpportunityFilterComponent } from './components/opportunity-filter/opportunity-filter.component';
import { OpportunityWidgetComponent } from './components/opportunity-widget/opportunity-widget.component';
import { OpportunityDetailsPageComponent } from './pages/opportunity-details-page/opportunity-details-page.component';
import { OpportunityInfoComponent } from './components/opportunity-info/opportunity-info.component';

@NgModule({
  declarations: [
    ListOfOpportunitiesComponent,
    OpportunityDirectoryComponent,
    OpportunityFilterComponent,
    OpportunityWidgetComponent,
    OpportunityDetailsPageComponent,
    OpportunityInfoComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OpportunityManagementRoutingModule,
    TranslateModule,
  ]
})
export class OpportunityManagementModule { }
