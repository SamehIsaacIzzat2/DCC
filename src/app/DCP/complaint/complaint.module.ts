import { AngularMaterialModule } from './../../AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintPageComponent } from './pages/complaint-page/complaint-page.component';
import { RegisteredUserComplaintComponent } from './components/registered-user-complaint/registered-user-complaint.component';
import { GeneralUserComplaintComponent } from './components/general-user-complaint/general-user-complaint.component';


@NgModule({
  declarations: [
    ComplaintPageComponent,
    RegisteredUserComplaintComponent,
    GeneralUserComplaintComponent
  ],
  imports: [
    CommonModule,
    ComplaintRoutingModule,SharedModule,FormsModule,ReactiveFormsModule,AngularMaterialModule,TranslateModule,
  ]
})
export class ComplaintModule { }
