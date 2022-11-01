import { Component, OnInit } from '@angular/core';
import { PaymentListPageModel } from './payment-list-page.model';

@Component({
  selector: 'app-payment-list-page',
  templateUrl: './payment-list-page.component.html',
  styleUrls: ['./payment-list-page.component.scss'],
  providers:[PaymentListPageModel]
})
export class PaymentListPageComponent implements OnInit {

  constructor(public model:PaymentListPageModel) { }

  ngOnInit(): void {
  }

}
