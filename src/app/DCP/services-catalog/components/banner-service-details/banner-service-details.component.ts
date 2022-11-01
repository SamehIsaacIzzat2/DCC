import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { bannerSerDetails } from './bannerSerDetails.interface';
import { PlatformService } from '../../../../SharedModule/Services/platform.service';
@Component({
  selector: 'banner-service-details',
  templateUrl: './banner-service-details.component.html',
  styleUrls: ['./banner-service-details.component.scss']
})
export class BannerServiceDetailsComponent implements OnInit {
  @Input() serviceDetails: bannerSerDetails = {} as bannerSerDetails;
  @Input() serviceUrl: string = "";
  constructor(private authService: AuthenticationService, private router: Router,public platformSer:PlatformService) { }

  ngOnInit(): void {
  }


  checkUserAuthetication() {
    if (!this.authService.isAuthorized()) {
      this.router.navigate(['/'+this.platformSer.getPlatform()+"/identity/login"], { state: { selectedServiceId: 1 } })
    } else {
      this.router.navigateByUrl(this.serviceUrl);
    }
  }



}
