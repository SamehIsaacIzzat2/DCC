import { Component } from '@angular/core';
import { bannerSerDetails } from 'src/app/DCP/services-catalog/components/banner-service-details/bannerSerDetails.interface';
import{PlatformService}from'../../../SharedModule/Services/platform.service';
@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {
  serDerails:bannerSerDetails = {
    user : 220,
    rating: 1,
    ratingNum : 190,
    serName: "Attestation",
    serviceChannels: "Submitting the application throuth Dubai Chamber website or the smart application and in case you encounter any issues during submition, you can procceed to customer happiness center",
    accTime: "<p>2 minutes throuth Dubai Chamber website</p><p p > 6 minutes throuth visiting Dubai Chamber customer happiness center</p>"
  }
  constructor(public platformSer:PlatformService) { }

}
