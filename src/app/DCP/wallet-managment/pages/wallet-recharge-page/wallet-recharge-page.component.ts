import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WalletRechargeModel } from './wallet-recharge.model';

@Component({
  selector: 'app-wallet-recharge-page',
  templateUrl: './wallet-recharge-page.component.html',
  styleUrls: ['./wallet-recharge-page.component.scss'],
  providers:[WalletRechargeModel]
})
export class WalletRechargePageComponent implements OnInit {
  item: any = {
    icon: 'done',
    title:this.translateSer.instant("memberShipsModule.wallet.rechargeWalletDone"),
    btnConfig: {
      text: this.translateSer.instant("memberShipsModule.wallet.walletDetails"),
      url: ['/dcc/services/wallets/wallet-details'],
    },
  }

  constructor(public model:WalletRechargeModel,private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
