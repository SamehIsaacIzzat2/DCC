import { ModalService } from './../../../../SharedModule/Components/Modal/modal.service';
import { EventEmitter } from '@angular/core';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { Subject, takeUntil } from 'rxjs';
import { APICallerService } from './../../../../CallerModule/Services/APICaller.service';
import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { RequestActionResult } from './Enum.request-action-result';
import { requestAction } from './request-action.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'request-action-result',
  templateUrl: './request-action-result.component.html',
  styleUrls: ['./request-action-result.component.scss']
})
export class RequestActionResultComponent implements OnDestroy {

  //======================================Data==========================================
  endSub$ = new Subject();
  @Input() actionStatus: RequestActionResult;
  @Input() item: requestAction;
  @Input() requestState: number;
  @Input() requestId:string='';
  @Output() refreshBtn = new EventEmitter();
  @Output() showCompanyDetails = new EventEmitter();
  @Output() selectunselectCompany = new EventEmitter();

  // selectFlag:boolean=false;

  constructor(private apiSer: APICallerService, private modelSer: ModalService,private router:Router) {
  }

  selectCompany(){
    // this.selectFlag=true;
    this.item.selected=true;
    this.selectunselectCompany.emit(true);

  }
  unSelectCompany(){
    // this.selectFlag=false;
    this.item.selected=false;

    this.selectunselectCompany.emit(false);

  }
  goToCompanyInfo(){
    // Converts the route into a string that can be used
    // with the window.open() function
  const url = this.router.serializeUrl(
    this.router.createUrlTree([`/dcc/services/requests/${this.requestId}/companyInfo/${this.item.id}`])
  );
  console.log(url)

  window.open(url, '_blank');

  }

  // routetocompany(companyid:string){
  //   console.log("company is => " ,companyid);
  //   this.showCompanyDetails.emit();
  // }

  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete();
  }

}
