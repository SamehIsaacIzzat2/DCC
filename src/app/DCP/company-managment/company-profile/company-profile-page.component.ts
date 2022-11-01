import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from './services/company.service';
import { take, pluck, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-company-profile-page',
  templateUrl: './company-profile-page.component.html',
  styleUrls: ['./company-profile-page.component.scss'],
})
export class CompanyProfilePageComponent implements OnInit {
  public banner: iBanner = {
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: 'dcc/services' },
      { title: this.translateSer.instant('bannerData.breadCrump.companies'), link: 'dcc/services/companys' },
    ],
  };
  public allInformationLinks: any[] = [
    {
      title: this.translateSer.instant("companyModule.profile.generalInfo"),
      url: ['general'],
    },
    {
      title: this.translateSer.instant("companyModule.profile.address&ContactInformation"),
      url: ['address'],
    },
    {
      title: this.translateSer.instant("companyModule.profile.social&OtherInformation"),
      url: ['social'],
    },
    // {
    //   title: this.translateSer.instant("companyModule.profile.communicationSettings"),
    //   url: ['contact'],
    // },
  ];
  constructor(private active: ActivatedRoute,private compSer:CompanyService,private translateSer:TranslateService) {
    this.getId();
  }
  // get current company id
  getId() {
    this.active.params
      .pipe(
        take(1),
        pluck('id'),
        tap((id) => this.getCompDetails(id))
      )
      .subscribe();
  }
  //get current company details
  getCompDetails(companyId:string) {
    this.compSer.getCompanyDetails(companyId).subscribe()
  }

  ngOnInit(): void {
  }

  public isMobile(){
    return window.innerWidth <= 420;
  }
}
