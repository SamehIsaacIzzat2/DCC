import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../../AngularMaterialModule/angularMaterialModule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../app/SharedModule/shared.module"
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestDirectoryComponent } from './components/request-directory/request-directory.component';
import { RequestFilterComponent } from './components/request-filter/request-filter.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { DetailsComponent } from './components/details/details.component';
import { RequestResultComponent } from './components/request-result/request-result.component';
import { CreateRequestPageComponent } from './page/create-request-page/create-request-page.component';
import { RequestFinalDetailsComponent } from './components/request-final-details/request-final-details.component';
import { RequestActionsComponent } from './components/request-actions/request-actions.component';
import { RequestActionResultComponent } from './components/request-action-result/request-action-result.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RequestDetailsPageComponent } from './page/request-details-page/request-details-page.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RequestDirectoryComponent,
    RequestFilterComponent,
    CreateRequestComponent,
    DetailsComponent,
    RequestResultComponent,
    CreateRequestPageComponent,
    RequestFinalDetailsComponent,
    RequestActionsComponent,
    RequestActionResultComponent,
    RequestDetailsPageComponent,
    
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    AngularMaterialModule, FormsModule, ReactiveFormsModule,TranslateModule
  ],
  exports:[
    RequestActionResultComponent
  ]
})
export class RequestsModule { }
