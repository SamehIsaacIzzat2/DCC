import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-redirect-registration-event-page',
  templateUrl: './redirect-registration-event-page.component.html',
  styleUrls: ['./redirect-registration-event-page.component.scss']
})
export class RedirectRegistrationEventPageComponent implements OnInit {

  //************************Data************************* */
  banner: iBanner = {
    title: this.translateSer.instant('eventsModule.registerEvent2'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translateSer.instant('eventsModule.events'), link: '/events' },
      { title: this.translateSer.instant('eventsModule.registerEvent2') },
    ],
    subbreadCrump: [""],

  }
  constructor(private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
