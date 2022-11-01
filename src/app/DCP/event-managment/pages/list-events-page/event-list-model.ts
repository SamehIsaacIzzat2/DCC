import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { ILeadData } from 'src/app/DCP/lead-management/components/lead-widget/iLeadData';
import { RequestStatus } from 'src/app/DCP/requests/components/request-filter/request-status.model';
import { EventData } from '../../components/event-list/event-data';

@Injectable()
export class EventList {
  public filterRequestStatus: RequestStatus[] = [];
  public textTerm: string = '';
  public p: number = 1;
  public totalPages: number = 0;
  public rowData: EventData[] = [];
  public loading: boolean = true;
  private endSub$ = new Subject();
  public attendeeEmail: string = '';

  constructor(private apiSer: APICallerService, private route: ActivatedRoute) {
    // check if attendeeMail parameter exist or not
    this.route.queryParams.subscribe((prams: Params) => {
      if (prams.attendeeMail) {
        this.attendeeEmail = prams.attendeeMail;
      }
    });

    // call Api to get Data
    this.getData();

    // console.log( this.attendeeEmail)
  }

  getData() {
    console.log(this.filterRequestStatus);
    let filterStatus = '';
    // let sortType = "";

    if (this.filterRequestStatus.length > 0) {
      // debugger
      filterStatus = this.filterRequestStatus
        .filter((x) => x.name == 'requeststatus')
        .map((x) => x.id)
        .join(',');
      // if (filterStatus.indexOf('0') != -1)
      // {
      //   filterStatus = '';
      // }
      // sortType = this.filterRequestStatus.filter(x => x.name == "sortType").map(x => x.id).join(",");
    } else {
      filterStatus = '';
    }
    console.log(filterStatus, filterStatus.length);
    const apiPath =
      APIs.Events.GetAll +
      '?EventType=' +
      filterStatus +
      '&Term=' +
      this.textTerm +
      '&Email=' +
      this.attendeeEmail;
    this.apiSer
      .get(apiPath)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        if (res.result == undefined) {
          this.rowData = [];
        } else {
          this.loading = false;
          this.rowData = res.result;
          this.rowData.forEach((element) => {
            // element.time = element.time .slice(0,5)+" am";
          });
        }
      });
  }

  filterData(evt: RequestStatus) {
    this.filterRequestStatus.push(evt);
    this.getData();
  }

  filterdataByText(evt: string) {
    console.log('this is typed text', evt);
    this.textTerm = evt;
    this.getData();
  }
  removefilterData(evt: RequestStatus) {
    this.filterRequestStatus.splice(
      this.filterRequestStatus.findIndex(
        (ele: RequestStatus) => ele.id == evt.id
      ),
      1
    );
    console.log(this.filterRequestStatus);
    this.getData();
  }

  chnageState(evt: { id: string; state: string }) {
    this.rowData = this.rowData.map((ele) => {
      if (ele.id == evt.id) {
        return { ...ele, statusName: evt.state };
      } else {
        return ele;
      }
    });
    console.log(this.rowData);
  }
}
