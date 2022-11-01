import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { RequestStatus } from 'src/app/DCP/requests/components/request-filter/request-status.model';
import { ICompanyData } from '../company-widget/iCompanyData';

@Injectable()
export class CompanyList {
  // public p: number = 1;
  // public activePage = 1;
  // public totalPages: number = 0;
  public id: string;
  requestsStatusdiagramData: any;
  totalRequests: number = 0;
  filterRequestStatus: RequestStatus[] = [];

  public rowData: ICompanyData[] = [];
  public loading: boolean = true;
  private endSub$ = new Subject();

  //===================================Data==============================

  constructor(private apiSer: APICallerService) {
    this.getData();
  }
  //==================================Logic===============================

  getData() {
    let filterStatus = '';
    let sortType = '';
    if (this.filterRequestStatus.length > 0) {
      filterStatus = this.filterRequestStatus
        .filter((x) => x.name == 'requeststatus')
        .map((x) => x.id)
        .join(',');
      sortType = this.filterRequestStatus
        .filter((x) => x.name == 'sortType')
        .map((x) => x.id)
        .join(',');
    } else {
      filterStatus = '';
      sortType = '';
    }

    const apiPath =
      APIs.Companys.GetAll +
      '?CompanyType=' +
      filterStatus +
      '&SortingType=' +
      sortType;

    this.apiSer
      .get(apiPath)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        if (res.result == undefined) {
          this.rowData = [];
        } else {
          this.loading = false;
          this.rowData = res.result;
        }
      });
  }
  filterData(evt: RequestStatus, state: boolean) {
    console.log('evt', evt);
    if (state) this.filterRequestStatus.push(evt);
    else
      this.filterRequestStatus = this.filterRequestStatus.filter(
        (opt) => opt.id !== evt.id
      );
    this.getData();
    console.log('filterRequestStatus', this.filterRequestStatus);
  }
}
