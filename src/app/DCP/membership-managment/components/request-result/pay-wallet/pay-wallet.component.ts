import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';

@Component({
  selector: 'pay-wallet',
  templateUrl: './pay-wallet.component.html',
  styleUrls: ['./pay-wallet.component.scss']
})
export class PayWalletComponent implements OnInit {

  //**********************************Inputs************************************ */
  @Input() requestId:any;


  //**********************************Data************************************ */
  public endSub$ = new Subject();


  constructor(private translateService:TranslateService,private apiSer:APICallerService , private modalService:FormModalService ,private _router:Router,private snackService:SnackService) { }

  ngOnInit(): void {
  }

  //*****************************************Logic************************************* */
 
  onSubmit(dismissButtonId:string) {
    const DataToSend = {
      requestNumber: `${this.requestId}`,
      paymentMethod:121290002,
    };
    console.log('DataToSend', DataToSend);;


    this.apiSer.post(APIs.membership.bankTransfer, DataToSend)
       .pipe(takeUntil(this.endSub$))
       .subscribe({
        next: (res) => {
          if (!res.isError) {
            this.modalService.hide(dismissButtonId);
            this.snackService.snack(this.translateService.instant('shared.generalWord.submittedsuccessfully'));
            this._router.navigate(['/dcc/services/requests']);
          }
        },
        error: () => {
          this.snackService.snack(
            this.translateService.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }
  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete()
  }
}
