import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { bannerSerDetails } from '../banner-service-details/bannerSerDetails.interface';

@Component({
  selector: 'app-service-membership-details',
  templateUrl: './service-membership-details.component.html',
  styleUrls: ['./service-membership-details.component.scss']
})
export class ServiceMembershipDetailsComponent implements OnInit {
  banner: iBanner = {
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.services'), link: '/dcc/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.servicesDirectory'), link: '/dcc/services/details' },
      ],
    subbreadCrump: [this.translateSer.instant('bannerData.breadCrump.newMemberShip')]
  }
  serDerails: bannerSerDetails = {
    user: 220,
    rating: 1,
    ratingNum: 190,
    serName: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
    serviceChannels: this.translateSer.instant('reqestModule.createRequest.membershipServiceChannels'),
    accTime: "<p>"+this.translateSer.instant('reqestModule.createRequest.twoMinutesDubaiChamerWebsite')+"</p><p p >" +this.translateSer.instant('reqestModule.createRequest.sixMinutesDubaiChamperCustomerHappiness')+ "</p>"
  }
  constructor(private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
