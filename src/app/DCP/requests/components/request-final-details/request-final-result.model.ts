import { takeUntil, Subject } from 'rxjs';
import { APIs } from './../../../../CallerModule/Data/APIs';
import { APICallerService } from './../../../../CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { RequestState, RequestStatusCard } from 'src/app/SharedModule/Components/request-status-card/IrequestCard';

@Injectable()
export class RequestFinalResult {
  private endSub$ = new Subject();

  //===========================Data============================
  requestStatus: RequestStatusCard[] = [];
  constructor(private apiSer: APICallerService) {

  }

  getData() {
    const apiPath = APIs.lookups.reqStatus;
    this.apiSer.get(apiPath).pipe(takeUntil(this.endSub$)).subscribe(res => {
      if (res.result == undefined) {
        this.requestStatus = [];
      }
      else {
        res.result.forEach((element: { name: any;id:string }) => {
          this.requestStatus.push({state:RequestState.inactive,title:element.name,id:element.id})
        });
      }
    })
  }

  getStateId(stateName:string):string{
    return this.requestStatus.find((state) => state.title === stateName)!.id ?? ""
  }

  getdataLeads(){
    const apiPath = APIs.lookups.LeadStatus;
    this.apiSer.get(apiPath).pipe(takeUntil(this.endSub$)).subscribe(res => {
      if (res.result == undefined) {
        this.requestStatus = [];
      }
      else {
        let index:number=1;
        res.result.forEach((element: { name: any; }) => {
          if (index > 1) {
            this.requestStatus.push({state:RequestState.inactive,title:element.name})

          }
          index++;
        });
      }
    })
  }
}
