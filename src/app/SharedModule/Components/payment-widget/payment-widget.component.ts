import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaymentDataModel } from 'src/app/DCP/membership-managment/pages/payment-list-page/Interfaces/Payment';

@Component({
  selector: 'payment-widget',
  templateUrl: './payment-widget.component.html',
  styleUrls: ['./payment-widget.component.scss']
})
export class PaymentWidgetComponent implements OnInit ,OnChanges {

  //*******************************************Inputs & outputs******************************************* */
  @Input() item:PaymentDataModel;

  //*******************************************Lookups data******************************************* */
  public paymentMethodName:string='';
  public paymentMethod:any[]=[
  
    {
      id:121290000,
      name:this.translateSer.instant('memberShipsModule.payment.filters.dubaiPay')
    },
    {
      id:121290001,
      name:this.translateSer.instant('memberShipsModule.payment.filters.Offline')
    },
    {
      id:121290002,
      name:this.translateSer.instant('memberShipsModule.payment.filters.Wallet')
    },
    {
      id:121290003,
      name:this.translateSer.instant('memberShipsModule.payment.filters.visaMastercard')
    },
    {
      id:121290004,
      name:this.translateSer.instant('memberShipsModule.payment.filters.bankTransfer')
    }
  ]
  constructor(private translateSer:TranslateService) {

   }
  ngOnChanges(changes: SimpleChanges): void {
    this.paymentMethodName=this.paymentMethod.filter((method)=>method.id == this.item.paymentMethod)[0]?.name
  }

  ngOnInit(): void {
  }

}
