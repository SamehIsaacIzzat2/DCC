import { Component, Input, OnInit } from '@angular/core';
import { IOpportunityData } from './iOpportunityData';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-opportunity-widget',
  templateUrl: './opportunity-widget.component.html',
  styleUrls: ['./opportunity-widget.component.scss']
})
export class OpportunityWidgetComponent implements OnInit {
  @Input() item: IOpportunityData;

  @Input() showIndetails: boolean=true;
  @Input() status:number;
  constructor(public translate:TranslateService) { }

  ngOnInit(): void {
  }

}
