import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from "@angular/core";
import { IRequestData } from "src/app/SharedModule/Components/request-widget/iReuestData";
import { LeadStatus } from 'src/app/DCP/lead-management/components/leadfilter/lead-status.model';

@Injectable()
export class EventFilter {

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
    const eventTypes = this.apiSer.get(APIs.lookups.eventTypes,false);

    combineLatest([eventTypes]).pipe(takeUntil(this.endSub$)).subscribe(([eventTypes]) => {
      this.reqStatus = eventTypes.result;

    })
  }

  public endSubs() {
    this.endSub$.next("");
    this.endSub$.complete();
  }


  //==========================Logic====================

}
