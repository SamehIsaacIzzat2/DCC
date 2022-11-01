import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";

@Injectable()
export class WalletRechargeModel {

  public resultFlag:boolean=false;

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

    //****************************************Constructor*********************************************** */
    constructor(private translateSer:TranslateService){

    }

    walletCharged(flag:boolean){
      this.resultFlag=true;
    }

    
}
