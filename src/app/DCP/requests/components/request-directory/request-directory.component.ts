import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { IchartData } from 'src/app/SharedModule/Components/chart/interfaces';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { PlatformService } from '../../../../SharedModule/Services/platform.service';
import { RequestDirectory } from './request-directory.model';

@Component({
  selector: 'request-directory',
  templateUrl: './request-directory.component.html',
  styleUrls: ['./request-directory.component.scss'],
  providers:[RequestDirectory]
})
export class RequestDirectoryComponent implements OnInit {
public p:number=1;
public totalPages:number=0;
banner: iBanner = {
    title: this.translate.instant('reqestModule.bannerTitle.mainTitle'),
    breadCrump: [
      { title:  this.translate.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translate.instant('bannerData.breadCrump.requests'), link: '/dcc/services/requests' },
      ],
    // subbreadCrump: [""],
    // menus:[{title:'My Requests' ,link:" "},
    //         {title:'Companies'},
    //         {title:'Documents'},
    //         {title:'Payment'},
    //         {title:'Services'},
    //       ]
  }


  constructor(public model:RequestDirectory ,public langSer: LanguageService,public translate:TranslateService,public platformSer:PlatformService) {


  }

  ngOnInit(): void {


  }

  //===================pagination-Logic======================\
  
  changePage(data:any){

    this.totalPages=Math.ceil(this.model.rowData.length /5);
    console.log(this.totalPages)
    if(data > this.totalPages){
      this.p=this.totalPages;
      return;
    }else if(data <= 0){
      this.p=1;
      return;

    }else{
      this.p=data;
      return;
    }
  }

}
