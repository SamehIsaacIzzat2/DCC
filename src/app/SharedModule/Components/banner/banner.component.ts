import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { bannerModes } from './banner.enum';
import { iBanner, menu } from './banner.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from '../../Services/platform.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() bannerData: iBanner;
  @Input() bannerMode : bannerModes;
  @Input() paddingFlag:boolean=false;
  @Input() EditFlag:boolean=false;
  @Input() withoutSearchButton:boolean=false;
  @Input() logineduser:boolean=false;
  @Output() filter = new EventEmitter();
  textsearch:string="";
  currentPlatform:String="";

  public menus: menu[] = [];
  public authenticationFlag:boolean=false;
  constructor(public authSer:AuthenticationService,public router:Router,public translate:TranslateService,public langSer:LanguageService,public platformServ:PlatformService) {
    this.currentPlatform=this.platformServ.getPlatform();
   
    this.menus = [
      {title:this.translate.instant('bannerData.bannerNavigationLinks.requests'),link:this.currentPlatform+"/services/requests"},
      {title:this.translate.instant('bannerData.bannerNavigationLinks.companies'),link:"dcc/services/companys"},
    ]

    if(this.platformServ.getPlatform()=="dic"){
      this.menus=this.menus.concat([
        {title:this.translate.instant('bannerData.bannerNavigationLinks.leads'),link:"dic/services/leads"},
        {title:this.translate.instant('bannerData.bannerNavigationLinks.opportunites'),link:"dic/services/opportunities"},
      ]);
    }else if(this.platformServ.getPlatform()=="dcc"){
      this.menus=this.menus.concat([
        {title:this.translate.instant('bannerData.bannerNavigationLinks.payment'),link:"dcc/services/payments"},
        {title:this.translate.instant('memberShipsModule.wallet.wallets'),link:"dcc/services/wallets"},
        {title:this.translate.instant('memberShipsModule.documents.documents'),link:"dcc/services/documents"},
      ]);
    }
    this.menus.push({title:this.translate.instant('bannerData.bannerNavigationLinks.services'),link:this.currentPlatform+"/services"});
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(){
    console.log(this.authSer.isAuthorized())
   this.authenticationFlag= this.authSer.isAuthorized();
  }

  public getGeneralMode(){
    return this.bannerMode == bannerModes.general
  }
  public getWithSearchMode(){
    return this.bannerMode == bannerModes.withSearch
  }
  public getDetailsMode(){
    return this.bannerMode == bannerModes.details
  }
  public getWithSubMenuMode(){
    return this.bannerMode == bannerModes.withSubMenu
  }
  

  logout(){
    this.authSer.signOut();
  }

  filterByText(){
    this.filter.emit(this.textsearch);      
  }

}
