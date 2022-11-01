import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { LeadList } from './list-of-leads.model';

@Component({
  selector: 'app-leadmanagmentdirectory',
  templateUrl: './leadmanagmentdirectory.component.html',
  styleUrls: ['./leadmanagmentdirectory.component.scss']
})
export class LeadmanagmentdirectoryComponent implements OnInit {
  public p:number=1;
  public totalPages:number=0;
  banner: iBanner = {
    title: this.translateSer.instant("leadsModule.bannerTitle.mainTitle"),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/leads' },
     ],
  }
  constructor(public model:LeadList,private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

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
