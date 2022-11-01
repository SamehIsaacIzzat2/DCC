import { Component, Input, OnInit } from '@angular/core';
import { RequestStatusCard } from './IrequestCard';

@Component({
  selector: 'request-status-card',
  templateUrl: './request-status-card.component.html',
  styleUrls: ['./request-status-card.component.scss']
})
export class RequestStatusCardComponent implements OnInit {

  //====================Data==============================
  @Input() item: RequestStatusCard;
  @Input() requestStatus: any;
  @Input() isPassedStep: boolean = false;
  @Input() isLast: boolean = false;
  @Input() leadStatusStyleFlag:boolean=false;
  @Input() createdDate:any;
  @Input() requestDetailsFlage:boolean=false;

  constructor() {
   }

  ngOnInit(): void {
  }

}
