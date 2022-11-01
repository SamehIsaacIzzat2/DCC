import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { IRequestData } from 'src/app/SharedModule/Components/request-widget/iReuestData';
import { RequestStatus } from '../request-filter/request-status.model';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestDirectory {
  requestsStatusdiagramData: any;
  totalRequests: number = 0;
  filterRequestStatus: RequestStatus[] = [];
  //filterRequestType:string[] = [];

  //======================Data====================
  public rowData: IRequestData[] = [];
  public loading: boolean = true;
  private endSub$ = new Subject();
  //=================Constructor==================

  constructor(private apiSer: APICallerService ,private router:Router) {
    this.getData();
    this.getRequestStatusStatistics();
  }
  getData() {
    let filterStatus = '';
    let filterType = '';
    let sortType = '';

    if (this.filterRequestStatus.length > 0) {
      filterStatus = this.filterRequestStatus
        .filter((x) => x.name == 'requeststatus')
        .map((x) => x.id)
        .join(',');
      if (filterStatus.indexOf('0') != -1) {
        filterStatus = '';
      }
      filterType = this.filterRequestStatus
        .filter((x) => x.name != 'requeststatus')
        .map((x) => x.id)
        .join(',');
      if (filterType.indexOf('0') != -1) {
        filterType = '';
      }
      sortType = this.filterRequestStatus
        .filter((x) => x.name == 'sortType')
        .map((x) => x.id)
        .join(',');
    } else {
      filterStatus = '';
      filterType = '';
    }

    const apiPath =
      APIs.requests.getAll +
      '?RequestStatus=' +
      filterStatus +
      '&ServiceType=' +
      filterType +
      '&RequestSortingType=' +
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

  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  public getRequestStatusStatistics() {
    let modifiedData = [];
    this.apiSer.get(APIs.requests.requestStatistic).subscribe((res) => {
      if (!res.isError) {
        let data = res.result;
        this.totalRequests = data.total;
        let temp = Object.keys(data).map((key) => {
          if (key != 'total') {
            return { status: key, percentage: data[key] };
          }
        });
        modifiedData = temp.filter((item) => item != undefined);
        this.requestsStatusdiagramData = modifiedData;
      }
    });
  }
  //==========================card naviation options====================
  navigateToDetails(itemData:any){
    console.log("itemData",itemData);
    if(itemData.serviceTypeName =='Business Matching Request'){
        if(itemData.status == 1){
          this.router.navigate([ '/dcc/requests/createRequest/' +itemData.id])
        }else{
          this.router.navigate(['/dcc/requests/requestDetails/' +itemData.id])
        }
    }
    else if(itemData.serviceTypeName =='New Membership' || itemData.serviceTypeName =='Cancel Membership'){
     if(itemData.statusName =='Draft'){
        this.router.navigate([ '/dcc/memberships/new-membership/' +itemData.id])
      }else{
        this.router.navigate(['/dcc/memberships/request-details/' +itemData.id])
      }
    
    }
  }
}
