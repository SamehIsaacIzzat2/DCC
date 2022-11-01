import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { ILeadData } from 'src/app/DCP/lead-management/components/lead-widget/iLeadData';
import { RequestStatus } from 'src/app/DCP/requests/components/request-filter/request-status.model';
import { EventData } from '../../components/event-list/event-data';

@Injectable()
export class EventComponentList {
  public filterRequestStatus: RequestStatus[] = [];
  public textTerm: string = '';
  public p: number = 1;
  public totalPages: number = 0;
  public rowData: EventData[] = [];
  private endSub$ = new Subject();
  public attendeeEmail: string = '';

  constructor(private route: ActivatedRoute) {
    // check if attendeeMail parameter exist or not
    this.route.queryParams.subscribe((prams: Params) => {
      if (prams.attendeeMail) {
        this.attendeeEmail = prams.attendeeMail;
      }
    });
  }

  changePage(data: any) {
    this.totalPages = Math.ceil(this.rowData.length / 6);
    if (data > this.totalPages) {
      this.p = this.totalPages;
      return;
    } else if (data <= 0) {
      this.p = 1;
      return;
    } else {
      this.p = data;
      return;
    }
  }
}
