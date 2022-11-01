import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddNewConsigneeComponent } from '../../components/add-new-consignee/add-new-consignee.component';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';
import { ConsigneeInfoComponent } from '../../components/consignee-info/consignee-info.component';
import { ExporterInfoComponent } from '../../components/exporter-info/exporter-info.component';
import { InvoiceInfoComponent } from '../../components/invoice-info/invoice-info.component';
import { ShipmentInfoComponent } from '../../components/shipment-info/shipment-info.component';
import { CooModel } from './new-coo.model';

@Component({
  selector: 'app-new-coo-page',
  templateUrl: './new-coo-page.component.html',
  styleUrls: ['./new-coo-page.component.scss'],
  providers: [CooModel],
})
export class NewCooPageComponent implements OnInit, AfterViewInit {

  @ViewChild(ExporterInfoComponent) exporterInfoComponent: ExporterInfoComponent;
  @ViewChild(ConsigneeInfoComponent) consigneeInfoComponent: ConsigneeInfoComponent;
  @ViewChild(AddNewConsigneeComponent) addNewConsigneeComponent: AddNewConsigneeComponent;
  @ViewChild(InvoiceInfoComponent) invoiceInfoComponent: InvoiceInfoComponent;
  @ViewChild(ShipmentInfoComponent) shipmentInfoComponent: ShipmentInfoComponent;
  @ViewChild(AttachmentsComponent) attachmentsComponent: AttachmentsComponent;
  constructor(public model: CooModel) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.model.ExporterInfoComponent = this.exporterInfoComponent;
    this.model.ConsigneeInfoComponent = this.consigneeInfoComponent;
    this.model.AddNewConsigneeComponent = this.addNewConsigneeComponent;
    this.model.InvoiceInfoComponent = this.invoiceInfoComponent;
    this.model.ShipmentInfoComponent = this.shipmentInfoComponent;
    this.model.AttachmentsComponent = this.attachmentsComponent;
  }

}
