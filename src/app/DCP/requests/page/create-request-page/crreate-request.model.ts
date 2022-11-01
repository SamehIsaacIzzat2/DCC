import { SnackService } from './../../../../SharedModule/Services/snack.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, BehaviorSubject } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { createRequest } from './create-request.interface';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { Step } from 'src/app/SharedModule/Components/steeper/iStepper.interface';
import { draftReq } from '../../interfaces/draftReq.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class createRequestModel {

  //======================Data====================
  private endSub$ = new Subject();
  data: createRequest = {} as createRequest;
  Detailsdata: createRequest = {} as createRequest;
  requestId: any = '';
  requestDetailData$: BehaviorSubject<draftReq> = new BehaviorSubject({} as draftReq);
  banner: iBanner = {
    title: this.translate.instant('reqestModule.createRequest.title'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title:this.translate.instant('bannerData.breadCrump.dashBoard'), link: '/dcc/services' },
      { title:this.translate.instant('bannerData.breadCrump.newRequest'), link: '/dcc/services/requests' },
      { title:this.translate.instant('reqestModule.createRequest.title'), },
    ]

  };
  public steps: Step[] = [
    {
      stepIndex: 1,
      stepTitle:this.translate.instant('reqestModule.createRequest.fillingInfo')
    },
    {
      stepIndex: 2,
      stepTitle:this.translate.instant('reqestModule.createRequest.previewInfo')
    }
  ];
  public activeStep = 1;
  //=================Constructor==================
  constructor(
    private apiSer: APICallerService,
    private router: Router,
    private route: ActivatedRoute,
    private snakSer: SnackService,
    public translate:TranslateService
  ) {
    this.checkEditMode();
  }
  checkEditMode() {
    this.requestId = this.route.snapshot.paramMap.get("id");
    if (this.requestId != null) {
      this.getDraftDataById(this.requestId);
    }
  }
  //==========================Logic====================



  setData(data: any) {

    this.data = {
      ...this.data,
      ...data
    };
    console.log(this.data);
  }

  setDetails(evt: any) {
    this.Detailsdata = {
      ...this.Detailsdata,
      ...evt
    }
  }
  submit(isdraft: boolean) {
    const apiPath = APIs.requests.createReq + "?isDraft=" + isdraft;
    if (this.requestId) this.data = { ...this.data, id: this.requestId }
    this.apiSer.post(apiPath, this.data).pipe(takeUntil(this.endSub$)).subscribe(res => {
      if (!res.isError && res.result.isSucceed) {
        if (isdraft == true) {
          this.snakSer.snack(`${this.translate.instant("shared.generalWord.draftnumber")} ${res.result.requestNumber} ${this.translate.instant("shared.generalWord.hasBeenUpdated")}`)
          this.router.navigate(['/dcc/requests']);
        } else if(isdraft == false) {
          this.router.navigate(['/dcc/requests/requestResult', res.result.requestNumber], {
            queryParams: {
              requestId: res.result.requestId
            }
          });
        }
      }
      else {
        this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))
      }
    })
  }

  getDraftDataById(id: any) {
    let requestdetailspath = APIs.requests.getDetailsForEdit + "/" + id;
    this.apiSer.get(requestdetailspath, false).pipe(takeUntil(this.endSub$)).subscribe(
      (DraftRequestData) => {
        if (!DraftRequestData.isError) {
          console.log("Api response",DraftRequestData.result)
          this.requestDetailData$.next(DraftRequestData.result);
        }
      }
    )
  }

  // steeper methods
  nextStep() {
    if (this.activeStep < 2) {
      if (this.activeStep == 1) {
        // debugger
        if (this.data.activitiesIds && this.data.activitiesIds.length > 0
          && this.data.description
          && this.data.industriesIds && this.data.industriesIds.length > 0
          && this.data.productsIds && this.data.productsIds.length > 0
          && this.data.interestId
          //&& this.model.data.countriesIds
          && this.Detailsdata.citiesIds && this.Detailsdata.citiesIds.length > 0
          && this.Detailsdata.countriesIds && this.Detailsdata.countriesIds.length > 0
          && this.Detailsdata.activitiesIds && this.Detailsdata.productsIds
          && this.Detailsdata.industriesIds) {
          this.activeStep++;
          console.log("Data that will dispaly--1",this.Detailsdata)

        } else {
          this.snakSer.snack(this.translate.instant("shared.generalWord.requiredData"));
          return;
        }
      } else {
        this.activeStep++;
      }
    }
  }
  cencel() {
    this.activeStep = 1;
  }

  goBackToServices(){
    this.router.navigate(['/dcc/services'])
  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }

}
