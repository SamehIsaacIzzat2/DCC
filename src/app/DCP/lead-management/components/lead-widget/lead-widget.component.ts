import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ILeadData } from './iLeadData';
import { ILeadInteractionData } from './iLeadInteractionData';
import { ILeadReferralsData } from './iLeadReferralsData';

@Component({
  selector: 'app-lead-widget',
  templateUrl: './lead-widget.component.html',
  styleUrls: ['./lead-widget.component.scss']
})
export class LeadWidgetComponent implements OnInit ,OnChanges {
  @Input() item: ILeadData;
  @Input() itemInteraction: ILeadInteractionData;
  @Input() referral: ILeadReferralsData;
  @Input() showIndetails: boolean=true;
  @Input() status:any;
  @Input() noArrow:boolean=true;
 
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.itemInteraction?.proposedDateTime)
    // itemInteraction?.proposedDateTime
  }

  ngOnInit(): void {
  }

}
