import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, BehaviorSubject, observable, Observable } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Injectable()
export class complaintPageModel {

  //======================Data====================
  endSub$ = new Subject();
  // data: createRequest = {} as createRequest;
  // Detailsdata: createRequest = {} as createRequest;
  // details$: BehaviorSubject<any> = new BehaviorSubject(null);
  // backDetailsdata: any;
  banner: iBanner = {
    title: this.translateSer.instant('complaintsModule.sendComplaints'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home') ,link:'/services'},
      { title: this.translateSer.instant('complaintsModule.complaints') ,link:'/services'},
      { title: this.translateSer.instant('complaintsModule.sendComplaints') },
    ]

        };
  //=================Constructor==================
  constructor(
    public authSer:AuthenticationService,
    private translateSer:TranslateService
  ) {

  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }


  public get isAuthenticated() : Observable<boolean> {
    return this.authSer.isAuthenticated.asObservable()
  }


  // setData(data: any) {
  //   this.data = {
  //     ...this.data,
  //     ...data
  //   };
  // }

  // setDetails(evt: any) {
  //   this.Detailsdata = {
  //     ...this.Detailsdata,
  //     ...evt
  //   }
  // }
  // setBackDetails(evt: any) {
  //   this.backDetailsdata = {
  //     ...this.backDetailsdata,
  //     ...evt
  //   };
  // }
  // submit(isdraft: boolean) {
  //   const apiPath = APIs.requests.createReq + "?isDraft=" + isdraft;
  //   this.apiSer.post(apiPath, this.data).pipe(takeUntil(this.endSub$)).subscribe(res => {
  //     if (!res.isError && res.result.isSucceed) {
  //       this.router.navigate(['/requests/requestResult', res.result.requestNumber]);
  //     }
  //     else {

  //     }
  //   })
  // }
  //==========================Logic====================

}
