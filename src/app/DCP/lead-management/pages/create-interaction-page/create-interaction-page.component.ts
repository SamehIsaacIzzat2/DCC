import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-create-interaction-page',
  templateUrl: './create-interaction-page.component.html',
  styleUrls: ['./create-interaction-page.component.scss']
})
export class CreateInteractionPageComponent implements OnInit {

  //**************************************Data***************************************** */
  public leadId: any = null;

  banner: iBanner = {} as iBanner;
  confirmationbanner: iBanner = {} as iBanner;
  public confirmationFlag: boolean = false;

  constructor(private Route: ActivatedRoute, private translateSer:TranslateService) {
    this.leadId = this.Route.snapshot.paramMap.get("leadId");
  }

  ngOnInit(): void {
    if (this.leadId != null) {
      this.banner = {
        title: this.translateSer.instant('bannerData.bannerNavigationLinks.createInteraction'),
        breadCrump: [
          { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/leads' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.Interactions'), link: `/dic/services/leads/leadDetails/${this.leadId}/interactionlist` },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.createInteraction') },
        ],
      };

      this.confirmationbanner = {
        title: this.translateSer.instant('shared.actions.back'),
        breadCrump: [
          { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/leads' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.Interactions'), link: `/dic/services/leads/leadDetails/${this.leadId}/interactionlist` },
        ],
      };
    }


  }

  goToCreateInteractionConfirmation(data: any) {
    this.confirmationFlag = true;
  }



}
