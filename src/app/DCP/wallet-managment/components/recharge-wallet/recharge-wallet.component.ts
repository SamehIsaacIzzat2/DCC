import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RechargeWalletModel } from './recharge-wallet.model';

@Component({
  selector: 'recharge-wallet',
  templateUrl: './recharge-wallet.component.html',
  styleUrls: ['./recharge-wallet.component.scss'],
  providers:[RechargeWalletModel]
})
export class RechargeWalletComponent implements OnInit {
  //===================================Output=============================
  @Output()  RechargeWallet:EventEmitter<boolean>=new EventEmitter<boolean>();

  constructor(public model:RechargeWalletModel) {
    this.model.RechargeWallet=this.RechargeWallet;
   }

  ngOnInit(): void {
  }

}
