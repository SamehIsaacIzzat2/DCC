import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventActionServiceService } from '../event-card/event-action-service.service';

@Component({
  selector: 'event-register-card',
  templateUrl: './event-register-card.component.html',
  styleUrls: ['./event-register-card.component.scss']
})
export class EventRegisterCardComponent implements OnInit {

  //=================================Data==========================
  public eventId:string;
  public eventAction:boolean;

  constructor(private router:Router,
    private eventActionService:EventActionServiceService, private route:ActivatedRoute) { 

      this.route.queryParams.subscribe(
        (prams:Params) =>{
          this.eventId=prams.id;
          this.eventAction=prams.isSuccess;
        }
      )
    }

  ngOnInit(): void {
  }

  //*****************************Logic*********************** */
  navigateToLogin(){
    this.router.navigate(['dcc/identity/login']);
  }

  navigateToEventRegistration(){    
    this.router.navigate(['/dcc/events/event-register'],{queryParams:{id:this.eventId,isSuccess:this.eventAction}});    
  }

}
