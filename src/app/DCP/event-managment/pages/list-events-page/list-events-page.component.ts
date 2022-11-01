import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { EventFilter } from '../../components/event-filter/event-filter.model';
import { EventList } from './event-list-model';

@Component({
  selector: 'app-list-events-page',
  templateUrl: './list-events-page.component.html',
  styleUrls: ['./list-events-page.component.scss'],
  providers:[EventList]
})
export class ListEventsPageComponent implements OnInit {

  //*****************************************Data*********************************** */
  public authenticationFlag:boolean=false;
  banner: iBanner = {
    title: this.translateSer.instant('eventsModule.eventsList'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home') ,link:'/services'},
      { title: this.translateSer.instant('eventsModule.events') ,link:'/events'},
      { title: this.translateSer.instant('eventsModule.eventsDirectory') },
          ],
    subbreadCrump: [""]
  }
  constructor(public model: EventList, private auth: AuthenticationService, private translateSer:TranslateService) {


  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(){
    console.log(this.auth.isAuthorized())
   this.authenticationFlag= this.auth.isAuthorized();
  }

}
