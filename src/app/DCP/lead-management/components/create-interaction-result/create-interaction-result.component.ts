import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'create-interaction-result',
  templateUrl: './create-interaction-result.component.html',
  styleUrls: ['./create-interaction-result.component.scss']
})
export class CreateInteractionResultComponent implements OnInit {

  //****************************Data******************* */
  public leadId:any="";
  public item: any = {};

  constructor(private route:ActivatedRoute,private translateSer:TranslateService) {
    this.route.params.subscribe((prameters) => {
      this.leadId = prameters.leadId;

  })
  }

  ngOnInit(): void {
   this.item= {
      icon: 'done',
     title: this.translateSer.instant("opportunitiesModule.interactions.interactionRequestSentSuccessfully"),
      btnConfig: {
        text: this.translateSer.instant("opportunitiesModule.interactions.backToInteractions"),
        url:`/dic/services/leads/leadDetails/${this.leadId}/interactionlist`,
      }
    }
  }

}
