import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewCooPageComponent } from './new-coo-page.component';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { ExporterInfoComponent } from '../../components/exporter-info/exporter-info.component';
import { ConsigneeInfoComponent } from '../../components/consignee-info/consignee-info.component';
import { ShipmentInfoComponent } from '../../components/shipment-info/shipment-info.component';
import { InvoiceInfoComponent } from '../../components/invoice-info/invoice-info.component';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';
import { PreviewComponent } from '../../components/preview/preview.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { CooManagementModule } from '../../coo-management.module';
import { AddNewConsigneeComponent } from '../../components/add-new-consignee/add-new-consignee.component';
import { AddProductComponent } from '../../components/invoice-info/add-product/add-product.component';
import { CooRequestResultComponent } from '../coo-request-result/coo-request-result.component';

const routes: Routes = [
  {
    path: '',
    component: NewCooPageComponent,
  },
];

@NgModule({
  declarations: [
    NewCooPageComponent,
    ExporterInfoComponent,
    ConsigneeInfoComponent,
    ShipmentInfoComponent,
    InvoiceInfoComponent,
    AttachmentsComponent,
    PreviewComponent,
    AddNewConsigneeComponent,
    AddProductComponent,
    CooRequestResultComponent
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    AngularMaterialModule,

  ],
  exports: [
    NewCooPageComponent,
    ExporterInfoComponent,
    ConsigneeInfoComponent,
    ShipmentInfoComponent,
    InvoiceInfoComponent,
    AttachmentsComponent,
    PreviewComponent,
    AddNewConsigneeComponent,
    CooRequestResultComponent
  ],
})
export class NewCooModule {}
