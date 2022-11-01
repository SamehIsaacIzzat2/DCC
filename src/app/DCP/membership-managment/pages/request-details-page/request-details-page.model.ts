import { Injectable } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { StatusNotifierService } from "../../status-notifier.service";

@Injectable()
export class RequestDetailsPageModel {

//******************************Data********************************* */
public requestId:string='';
public banner: iBanner = {
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translateSer.instant('memberShipsModule.memberShiprequestDetails.requestInfo'), link: '/dcc/services/memberships' },
    ],
    subbreadCrump: [],
    // title:this.translateSer.instant("bannerData.breadCrump.newMemberShip")
  };

public allInformationLinks:any[]=[
    {title:this.translateSer.instant('memberShipsModule.memberShiprequestDetails.requestInfo'),url:['requestInfo']},
    {title:this.translateSer.instant('memberShipsModule.memberShiprequestDetails.result&Action'),url:['request-result-actions']},
    {title:this.translateSer.instant('memberShipsModule.memberShiprequestDetails.message'),url:['request-messages']},
];

public item:any;

  //******************************constructor********************************* */
  constructor(private translateSer:TranslateService ,private activeRoute:ActivatedRoute ,private apiSer:APICallerService ,private statusNotifierSer:StatusNotifierService ){
    this.getMemberShipId()

  }

  //******************************Logic********************************* */
  private getMemberShipId(){
     // get membership request  Id
     this.activeRoute.params.subscribe((params: Params) => {
      const id = params['membershipId'];
      this.requestId = id;
      if(this.requestId) this.getrequestDetails(this.requestId)
      console.log( this.requestId)
  });
  }

   // get request Satatus
   private getrequestDetails(id:string){
    this.apiSer.get(APIs.membership.requestDetails + "/" + id).subscribe((res) => {
      if (!res.isError) {
        this.item = {
          requestId:res.result.id,
          requestNumber:res.result.requestNumber,
          serviceTypeName:res.result.requestAction,
          statusName:res.result.requestStatusName,
          created:res.result.createdOn,
        };
          
        this.statusNotifierSer.statusNotifier.next(res.result.requestStatus);

        this.statusNotifierSer.requestId.next(id);
      }
    });
  }

}
