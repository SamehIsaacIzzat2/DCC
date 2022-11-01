import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { RequestStatus } from "src/app/DCP/requests/components/request-filter/request-status.model";
import { ILeadData } from "src/app/DCP/lead-management/components/lead-widget/iLeadData";
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { IRequestData } from 'src/app/SharedModule/Components/request-widget/iReuestData';

@Injectable()
export class LeadList {
  requestsStatusdiagramData: any;
  totalRequests: number = 0;
  filterRequestStatus: RequestStatus[] = [];

  public rowData: ILeadData[] = [];
  public loading: boolean = true;
  public requestLoading: boolean = true;
  private endSub$ = new Subject();

  //===================================Data==============================

  constructor(private apiSer: APICallerService) {
    this.getData();
  }

  getData() {
    let filterStatus = '';
    let sortType = '';

    if (this.filterRequestStatus.length > 0) {
      filterStatus = this.filterRequestStatus
        .filter((x) => x.name == 'requeststatus')
        .map((x) => x.id)
        .join(',');
      if (filterStatus.indexOf('0') != -1) {
        filterStatus = '';
      }

      sortType = this.filterRequestStatus
        .filter((x) => x.name == 'sortType')
        .map((x) => x.id)
        .join(',');
    } else {
      filterStatus = '';
    }

    const apiPath =
      APIs.leads.getAll +
      '?LeadStatus=' +
      filterStatus +
      '&LeadSortingType=' +
      sortType;
    this.apiSer
      .get(apiPath)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        if (res.result == undefined) {
          this.rowData = [];
        } else {
          this.rowData = res.result;
          this.loading = false;

          console.log(this.rowData);
        }
      });
  }

  filterData(evt: RequestStatus) {
    this.filterRequestStatus.push(evt);
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

}
