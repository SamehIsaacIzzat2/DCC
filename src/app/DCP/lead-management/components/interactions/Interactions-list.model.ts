import { Injectable } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { ILeadInteractionData } from '../lead-widget/iLeadInteractionData';

@Injectable()
export class InteractionsListModel {
  interactionsData: ILeadInteractionData[] = [];
  loading: boolean = true;
  hasOpenStatus: boolean = false;
  endSub$ = new Subject();

  constructor(private apiSer: APICallerService) {}
  getDataInteractions(id: string) {
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.interactionsList + '/' + id;
    const mycompanys$ = this.apiSer
      .get(mycompanys, false)
      .pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details]) => {
        this.apiSer.hideLoader();
        if (!details.isError) {
          console.log('interaction-List', details.result);
          this.loading = false;
          this.interactionsData = details.result;

          let openedInteraction = this.interactionsData.filter(
            (interaction) => interaction.status == '1'
          );
          if (openedInteraction.length > 0) {
            this.hasOpenStatus = true;
          } else {
            this.hasOpenStatus = false;
          }
        }
      });
  }
}
