import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusNotifierService } from '../../status-notifier.service';
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'last-update-card',
  templateUrl: './last-update-card.component.html',
  styleUrls: ['./last-update-card.component.scss']
})
export class LastUpdateCardComponent implements OnInit {

  //*****************************Inputs*************************** */

  @Input() item:any;

  // to detect the status of the request to control the appearance of payment button
  @Input() requestStatus:any;

  public requestId:any='';

  constructor(private router:Router ,private statusNotifierSer:StatusNotifierService,private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {
  }

  payNow(){
    this.route.parent?.params.subscribe((params: Params) => {
      this.requestId=params.membershipId;
      this.router.navigate(['/dcc/services/memberships/request-result/'],{queryParams:{isPaymentAction:true,requestId:this.requestId}});
    });
  }

}
