import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";

@Injectable()
export class NewMessageModel {
    //=============================================Data======================================
    //=============================================banner Data======================================
    banner: iBanner = {
        breadCrump: [
          {
            title: this.translateSer.instant('bannerData.breadCrump.home'),
            link: '/dcc/services',
          },
          {
            title: this.translateSer.instant('bannerData.breadCrump.memberships'),
            link: '/dcc/services/memberships',
          },
          {
           
            title: this.translateSer.instant('leadsModule.messages.newMessage'),
            link: '',
          },
        ],
        subbreadCrump: [],
        // title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
      };

//===========================================Constructor==========================================
constructor(private translateSer:TranslateService ){

}
}
