import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";

@Injectable()
export class DetailsPageModel {

    //****************************Data**************************** */
    //start banner
    banner: iBanner = {
        breadCrump: [
            {
                title: this.translateSer.instant('bannerData.breadCrump.home'),
                link: '/dcc/services',
            },
            {
                title: this.translateSer.instant('bannerData.breadCrump.requests'),
                link: '/dcc/services/coo',
            },
            {
                title: this.translateSer.instant('shared.generalWord.requestInfo'),
                link: '',
            },
        ],
    }

    public allInformationLinks:any[]=[
        {title:this.translateSer.instant('cooModule.detailsData.cooInfo'),url:['requestInfo']},
        {title:this.translateSer.instant('cooModule.detailsData.resultAction'),url:['request-result-actions']},
    ];

    public item:any = {
        requestId:'45678654',
        requestNumber:'45678654',
        requestTitle:'COO Information',
        serviceTypeName:'COO Information',
        status: 1,
        statusName:'Pending Your Reply',
        created:new Date(2021,10,20),
      };

    //****************************constractor**************************** */

    constructor(private translateSer:TranslateService) {


    }


}
