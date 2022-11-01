import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';

@Component({
  selector: 'app-request-result',
  templateUrl: './request-result.component.html',
  styleUrls: ['./request-result.component.scss']
})
export class RequestResultComponent implements OnInit {

  //===========================================Input==================================
  @Input() requestId:string='';
   //======================================Data========================
   public myRequestNumber:string;
   public isPaymentAction:boolean=false;

   item: any = {
     icon: 'done',
     title:this.translate.instant('memberShipsModule.memberShiprequestDetails.cardTitle'),
     btnConfig: {
      text:this.translate.instant('reqestModule.createRequest.viewRequests'),
      url: "/requests",
    }
   }
 
   banner: iBanner = {
     title:this.translate.instant('bannerData.breadCrump.createRequest'),
 
     breadCrump: [
       { title: this.translate.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
       { title: this.translate.instant('bannerData.breadCrump.requests'), link: '/dcc/services/requests' }, 
       ],
    //  subbreadCrump: [this.translate.instant('bannerData.breadCrump.createRequest')],
 
   }

  constructor(private translate:TranslateService, private modalServic:FormModalService ,private activate:ActivatedRoute ) {
    this.activate.queryParams.subscribe((prams)=>{
      if(prams.isPaymentAction){
        this.isPaymentAction=prams.isPaymentAction;
      }
      if(prams.requestId){
        this.requestId=prams.requestId;
      }
    })
   }

  ngOnInit(): void {
  }

  actionType(event:string){
    this.modalServic.show(event)
    console.log("aciton type in requset result is ", event)
  }

}
