import { Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';

@Injectable()
export class RequestResultModel {
  public requestId: string;
  //******************************Data*************************** */

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
        title: this.translateSer.instant('bannerData.breadCrump.createCoo'),
        link: '',
      },
    ],
    subbreadCrump: [],
    title: this.translateSer.instant('cooModule.createCoo'),
  };
  item: any = {
    icon: 'done',
    title: this.translateSer.instant('cooModule.detailsData.requestSubmitted'),
    btnConfig: {
      text: this.translateSer.instant('reqestModule.requestList.myRequests'),
      url: '/dcc/services/coo/request-details',
    },
  };

  //******************************Constructor*************************** */
  constructor(
    private translateSer: TranslateService,
    private modalServic: FormModalService,
    private activate: ActivatedRoute
  ) {
    this.activate.queryParams.subscribe((prams) => {
      if (prams.requestId) {
        this.requestId = prams.requestId;
      }
    });
  }

  ngOnInit(): void {}

  actionType(event: string) {
    this.modalServic.show(event);
    console.log('aciton type in requset result is ', event);
  }
}
