import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'send-message-result',
  templateUrl: './send-message-result.component.html',
  styleUrls: ['./send-message-result.component.scss']
})
export class SendMessageResultComponent implements OnInit {

  //***********************************Data***************************************** */
  public item:any={};
  public leadId:string='';

  constructor(public routeAcivate:ActivatedRoute,
    public router:Router,private tranlsateSer:TranslateService
    ) {
    this.routeAcivate.params.subscribe((prameters) => {
      this.leadId = prameters.id;

  })
   }

  ngOnInit(): void {

    let url ="";
    if(this.router.url.indexOf('opportunities') == -1)
    {
      url=`/dic/services/leads/leadDetails/${this.leadId}/messages`;
    }
    else
    {
      url=`/dic/services/opportunities/opportunityDetails/${this.leadId}/messages`;
    }
    this.item= {
      icon: 'done',
      title: this.tranlsateSer.instant("leadsModule.messages.yourMessageSentSuccessfully"),
      btnConfig: {
        text: this.tranlsateSer.instant("leadsModule.messages.backToMessages"),
        url:url,
      }
    }
  }

}
