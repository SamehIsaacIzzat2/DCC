import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { IRequestData } from "src/app/SharedModule/Components/request-widget/iReuestData";
import { LeadStatus } from './lead-status.model';

@Injectable()
export class LeadFilter {

  //======================Data====================
  public rowData: IRequestData[] = []
  reqStatus:LeadStatus[] = [];
  sortType:LeadStatus[] = [];

  private endSub$ = new Subject();
  //=================Constructor==================
  constructor(
    private apiSer: APICallerService
  ) {
    this.getData();
  }
  getData() {
    const status = this.apiSer.get(APIs.lookups.LeadStatus);
    const types = this.apiSer.get(APIs.lookups.LeadSortType);

    combineLatest([status,types]).pipe(takeUntil(this.endSub$)).subscribe(([status,types]) => {
      this.reqStatus = status.result;
      this.sortType = types.result;

    })
  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }


  //==========================Logic====================

}
