import { take, pluck } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request-result',
  templateUrl: './request-result.component.html',
  styleUrls: ['./request-result.component.scss']
})
export class RequestResultComponent implements OnInit {

  //======================================Data========================
  public myRequestNumber:string;
  item: any = {
    icon: 'done',
    title:this.translate.instant('reqestModule.createRequest.requestSendSucessfully'),
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
    subbreadCrump: [this.translate.instant('bannerData.breadCrump.createRequest')],

  }
  id: string = '';
  constructor(private active:ActivatedRoute ,public translate:TranslateService) {
    this.active.queryParams.subscribe(prams=>{
      if(prams.requestId){
        this.myRequestNumber=prams.requestId;
      }
    })
    this.getId();
  }
  getId() {
    this.active.params.pipe(take(1),pluck('id')).subscribe(id => {
      this.id = id;
    })
  }

  ngOnInit(): void {

  }

}
