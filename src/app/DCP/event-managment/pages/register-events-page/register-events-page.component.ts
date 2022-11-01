import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-register-events-page',
  templateUrl: './register-events-page.component.html',
  styleUrls: ['./register-events-page.component.scss']
})
export class RegisterEventsPageComponent implements OnInit {
  banner: iBanner = {
    title: this.translateSer.instant('eventsModule.bannerTitle.mainTitle'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translateSer.instant('eventsModule.events'), link: '/events' },
       ],
  }
  constructor(private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
