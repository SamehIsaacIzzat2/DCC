import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { bannerSerDetails } from '../banner-service-details/bannerSerDetails.interface';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  banner: iBanner = {
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.services'), link: '/dcc/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.servicesDirectory'), link: '/dcc/services/details' },
      ],
    subbreadCrump: [this.translateSer.instant('reqestModule.requestDetails.banner.title')]
  }
  serDerails: bannerSerDetails = {
    user: 220,
    rating: 1,
    ratingNum: 190,
    serName: this.translateSer.instant('reqestModule.requestDetails.banner.title'),
    serviceChannels: this.translateSer.instant('reqestModule.createRequest.submitDesc'),
    accTime: "<p>"+this.translateSer.instant('reqestModule.createRequest.twoMinutesDubaiChamerWebsite')+"</p><p p >" +this.translateSer.instant('reqestModule.createRequest.sixMinutesDubaiChamperCustomerHappiness')+ "</p>"
  }
  constructor(private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
