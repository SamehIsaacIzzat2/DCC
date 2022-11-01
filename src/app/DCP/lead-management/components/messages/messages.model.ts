import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { IMessage } from './iMessage';

@Injectable()
export class MessagesModel {
  public leadId: string;
  public messages: IMessage[] = [];
  public loading: boolean = true;
  public LeadStatus: string | undefined;
  public opportunityStatus: string | undefined;
  opportunityorlead: string = 'opportunity';
  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private apiCaller: APICallerService
  ) {
    this.LeadStatus = localStorage.getItem('LeadStatus')?.toString();
    this.opportunityStatus = localStorage
      .getItem('opportunityStatus')
      ?.toString();

    if (this.router.url.indexOf('opportunities') == -1) {
      this.opportunityorlead = 'lead';
    }

    this.routeActive.parent?.params.subscribe((params: Params) => {
      this.leadId = params['id'];
      this.getMessages(this.leadId);
    });
  }

  public getMessages(id: string) {
    this.apiCaller.showLoader();
    let apiPath = '';
    if (this.router.url.indexOf('opportunities') == -1) {
      apiPath = APIs.leads.getMessages + id;
    } else {
      apiPath = APIs.leads.getMessagesbyOpportunity + id;
    }

    this.apiCaller.get(apiPath, false).subscribe((res: any) => {
      this.apiCaller.hideLoader();
      if (!res.isError) {
        this.messages = res.result;
        this.loading = false;
        console.log('messages');
      }
    });
  }
}
