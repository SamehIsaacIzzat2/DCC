import { EventData } from './../event-list/event-data';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { EventActionServiceService } from './event-action-service.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EventCardModel {
  public endSub$ = new Subject();
  public actionTaken: boolean = false;
  public actionValue: string = '';
  public changeStateEvent = new EventEmitter();
  item: EventData;
  constructor(
    private apiSer: APICallerService,
    private route: Router,
    public authSer: AuthenticationService,
    private snakSer: SnackService,
    public translate:TranslateService

  ) { }


  Reject(id: string) {
    if (!this.authSer.isAuthorized()) {
      this.route.navigate(['events/redirectToRegister'], {
        queryParams: { id: id, isSuccess: false },
      });
    } else {
      this.AcceptReject(id, false);
    }
  }

  Accept(id: string) {

    if (!this.authSer.isAuthorized()) {
      this.route.navigate(['events/redirectToRegister'], { queryParams: { id: id, isSuccess: true } });
    } else {
      this.AcceptReject(id, true);
    }
  }

  AcceptReject(id: string, success: boolean) {
    // this.apiSer.showLoader();
    let mycompanys = APIs.Events.eventaction + "/" + id;
    const mycompanys$ = this.apiSer.post(mycompanys, {
      isAccept: success
    }).pipe(takeUntil(this.endSub$));

     combineLatest([mycompanys$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details]) => {
        // this.apiSer.hideLoader();
        if (!details.isError) {
          const result = details.result;
          this.actionTaken = true;
          let res = success ? this.translate.instant('eventsModule.eventsInfo.registered') : this.translate.instant('eventsModule.eventsInfo.rejected');
          this.actionValue = res;
          this.changeStateEvent.emit({
            id: this.item.id,
            state: this.actionValue,
          });
          if (success) {
              this.snakSer.snack(this.translate.instant('eventsModule.eventAction.Accepted'));
          }
          else {
              this.snakSer.snack(this.translate.instant('eventsModule.eventAction.rejected'));
          }

          // this.route.navigate(['events']);


        }

      })
  }
}


 

  // AcceptReject(id: string, success: boolean) {
  //   // this.apiSer.showLoader();
  //   let mycompanys = APIs.Events.eventaction + '/' + id;
  //   const mycompanys$ = this.apiSer
  //     .post(mycompanys, {
  //       isAccept: success,
  //     })
  //     .pipe(takeUntil(this.endSub$));

  //   combineLatest([mycompanys$])
  //     .pipe(takeUntil(this.endSub$))
  //     .subscribe(([details]) => {
  //       // this.apiSer.hideLoader();
  //       if (!details.isError) {
  //         const result = details.result;
  //         this.actionTaken = true;
  //         let res = success ? 'Registered' : ' Rejected ';
  //         this.actionValue = res;
  //         this.changeStateEvent.emit({
  //           id: this.item.id,
  //           state: this.actionValue,
  //         });
  //         // if (success) {
  //         //     this.snakSer.snack("Event Accepted");
  //         // }
  //         // else {
  //         //     this.snakSer.snack("Even Rejected ");
  //         // }

  //         this.route.navigate(['events']);
  //       }
  //   }
