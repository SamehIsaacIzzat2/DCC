import { Injectable } from '@angular/core';
import { serviceCard } from 'src/app/SharedModule/Components/CardWidget/serCard.interface';
import { rowWidget } from 'src/app/SharedModule/Components/RowWidget/rowWidget.interface';
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from './../../../../SharedModule/Services/lookup.service';
import { PlatformService } from './../../../../SharedModule/Services/platform.service';
import {takeUntil,Subject} from 'rxjs';
@Injectable()
export class serviceDirectory {
  //======================Data====================
  loading: boolean = true;
  data: serviceCard[] = [
    // {
    //   title: this.translateSer.instant('reqestModule.requestDetails.banner.title'),
    //   info: '',
    //   icon: 'BMR-image',
    //   disabled: false,
    //   link:'details'
    // },
    // {
    //   title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
    //   info: '',
    //   icon: 'BMR-image',
    //   disabled: false,
    //   link:'memberships'
    // },
    // {
    //   title:this.translateSer.instant("memberShipsModule.cancleMembership.cancleMembership"),
    //   info: '',
    //   icon: 'BMR-image',
    //   disabled: false,
    //   link:'cancle-membership'
    // },
    // {
    //   title: this.translateSer.instant('bannerData.breadCrump.renewMemberShip'),
    //   info: '',
    //   icon: 'BMR-image',
    //   disabled: false,
    //   link:'memberships/renew-membership'
    // },
    // {
    //   title: this.translateSer.instant('bannerData.breadCrump.newCoo'),
    //   info: '',
    //   icon: 'BMR-image',
    //   disabled: false,
    //   link:'coo'
    // },
    // {
    //   title: "Legal Services",
    //   info: "",
    //   icon: "Legal services",
    //   disabled: true,
    // },
    // {
    //   title: "ATA Carnet",
    //   info: "",
    //   icon: "ATA CARNET icon",
    //   disabled: true,
    // },
    // {
    //   title: "Document Verfication",
    //   info: "",
    //   icon: "Document Verification",
    //   disabled: true,
    // },
    // {
    //   title: "Forms & Guildlines",
    //   info: "",
    //   icon: "forms and guidelines icon",
    //   disabled: true,
    // },
    // {
    //   title: "Dubai Startup Hub",
    //   info: "",
    //   icon: "Dubai Startup hub",
    //   disabled: true,
    // },
    // {
    //   title: "Member Renew",
    //   info: "",
    //   icon: "Membership renew icon",
    //   disabled: true,
    // },
    // {
    //   title: "eBay For Business - UAE program",
    //   info: "",
    //   icon: "EBAY ICON",
    //   disabled: true,
    // },
    // {
    //   title: "Service Providers Referral",
    //   info: "",
    //   icon: "Service Provider referral",
    //   disabled: true,
    // },
  ];
  rowData: rowWidget[] = [
    { title: 'Certificate of Origin', info: 'info' },
    { title: 'New Membership', info: 'info' },
    { title: 'Dubai Assocciation Center', info: 'info' },
    { title: 'Attestation', info: 'info' },
    { title: 'ICC RBC MENA', info: 'info' },
    { title: 'Credit Rating', info: 'info' },
  ];
  public services=[];
  endSub$ = new Subject();
  //=================Constructor==================
  constructor(private translateSer:TranslateService,private lookupService: LookupService,public platformSer:PlatformService) {
    this.getServices();
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  //==========================Logic====================
  getServices(){
    const ServicesTypes$ = this.lookupService.getServicesTypes();
    ServicesTypes$.pipe(takeUntil(this.endSub$)).subscribe((services) => {
      services.forEach((service:any) => {
        if(service.name=="Create Business Matching Request"){
          this.data.push({
            title: this.translateSer.instant('reqestModule.requestDetails.banner.title'),
            info: '',
            icon: 'BMR-image',
            disabled: false,
            link:'details'
          });
        }
        if(service.name=="New Membership"){
          this.data.push({
            title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
            info: '',
            icon: 'BMR-image',
            disabled: false,
            link:'membership-details'
          });
        }
        if(service.name=="Cancel Membership"){
          this.data.push({
            title:this.translateSer.instant("memberShipsModule.cancleMembership.cancleMembership"),
            info: '',
            icon: 'BMR-image',
            disabled: false,
            link:'cancle-membership'
          });
        }
        if(service.name=="Renew Membership"){
          this.data.push({
            title: this.translateSer.instant('bannerData.breadCrump.renewMemberShip'),
            info: '',
            icon: 'BMR-image',
            disabled: false,
            link:'memberships/renew-membership'
          });
        }
        if(service.name=="Amend Membership"){
          this.data.push({
            title: this.translateSer.instant('bannerData.breadCrump.amendMemberShip'),
            info: '',
            icon: 'BMR-image',
            disabled: false,
            link:''
          });
        }
        console.log(services);
      });
    });
  }
}
