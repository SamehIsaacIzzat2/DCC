import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-wallet-refund-page',
  templateUrl: './wallet-refund-page.component.html',
  styleUrls: ['./wallet-refund-page.component.scss']
})
export class WalletRefundPageComponent implements OnInit {
    //****************************************data*********************************************** */
    public banner: iBanner = {
      breadCrump: [
        {
          title: this.translateSer.instant('bannerData.breadCrump.home'),
          link: '/services',
        },
        {
          title:this.translateSer.instant('memberShipsModule.wallet.wallets')
        }
      ],
      subbreadCrump: [],
      // title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
    };

    item: any = {
      icon: 'done',
      title:this.translateSer.instant("memberShipsModule.wallet.refundWalletDone"),
      btnConfig: {
        text: this.translateSer.instant("memberShipsModule.wallet.walletDetails"),
        url: ['/services/wallets/wallet-details'],
      },
    }

    public resultFlag:boolean=false;
  constructor(private translateSer:TranslateService ) { }

  ngOnInit(): void {
  }

  refundWallet(){
    this.resultFlag=true;
  }

}
