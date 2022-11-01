import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RefundWalletModel } from './refund-wallet.model';

@Component({
  selector: 'refund-wallet',
  templateUrl: './refund-wallet.component.html',
  styleUrls: ['./refund-wallet.component.scss'],
  providers:[RefundWalletModel]
})
export class RefundWalletComponent implements OnInit {

  //***********************************Output******************************************* */
  @Output() RefundWallet:EventEmitter<any>=new EventEmitter<any>();

  constructor(public model:RefundWalletModel) {
    this.model.RefundWallet=this.RefundWallet;
   }

  ngOnInit(): void {
  }

}
function output() {
  throw new Error('Function not implemented.');
}

