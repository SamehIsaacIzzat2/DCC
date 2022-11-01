import { Component, OnInit } from '@angular/core';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';
import { InvoiceModel } from './invoice-model';

@Component({
  selector: 'invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.scss'],
  providers: [InvoiceModel],
})
export class InvoiceInfoComponent implements OnInit {
  tbody = [
    {
      type: 'HS-Code',
      size: '345-Product',
      weight: '255',
      count: 'count',
      quantity: 'Quantity',
    },
  ];
  constructor(
    public model: InvoiceModel,
    private formModal: FormModalService
  ) {}

  ngOnInit(): void {}

  addPackage(index: any) {
    this.model.invoiceIndex = index;
    this.formModal.show('addProduct');
  }
}
