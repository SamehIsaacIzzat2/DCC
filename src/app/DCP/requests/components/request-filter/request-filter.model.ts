import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { IRequestData } from 'src/app/SharedModule/Components/request-widget/iReuestData';
import { RequestStatus } from './request-status.model';

@Injectable()
export class RequestFilter {
  //======================Data====================
  public rowData: IRequestData[] = [];
  reqStatus: RequestStatus[] = [];
  reqType: RequestStatus[] = [];
  sortType: RequestStatus[] = [];

  private endSub$ = new Subject();
  //=================Constructor==================
  constructor(private apiSer: APICallerService) {
    this.getData();
  }
  getData() {
    const status = this.apiSer.get(APIs.lookups.reqStatus);
    const types = this.apiSer.get(APIs.lookups.serviceTypes);
    const sortType = this.apiSer.get(APIs.lookups.sortTypes);

    combineLatest([status, types, sortType])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([status, types, sorttypes]) => {
        this.reqStatus = status.result;
        this.reqType = types.result;
        this.sortType = sorttypes.result;
        console.log('status', this.reqStatus);
      });
  }

  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  //==========================Logic====================
}
