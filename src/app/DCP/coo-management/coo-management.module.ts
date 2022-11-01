import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooManagementRoutingModule } from './coo-management-routing.module';
import { CooDetailsComponent } from './pages/coo-details-page/coo-details.component';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { CooRequestResultComponent } from './pages/coo-request-result/coo-request-result.component';
import { CooRequestInformationDetailsComponent } from './components/coo-request-information-details/coo-request-information-details.component';
import { CooRequestResultActionsDetailsComponent } from './components/coo-request-result-actions-details/coo-request-result-actions-details.component';
import { NewCooModule } from './pages/new-coo/new-coo.module';

@NgModule({
  declarations: [
    CooDetailsComponent,
    
    CooRequestInformationDetailsComponent,
    CooRequestResultActionsDetailsComponent,
  ],
  imports: [
    CommonModule,
    CooManagementRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NewCooModule,
  ],
})
export class CooManagementModule {}
