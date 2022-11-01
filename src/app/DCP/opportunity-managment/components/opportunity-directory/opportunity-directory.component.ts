import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { LeadOpportunityList } from '../list-of-Opportunity.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-opportunity-directory',
  templateUrl: './opportunity-directory.component.html',
  styleUrls: ['./opportunity-directory.component.scss'],
  providers:[LeadOpportunityList]
})
export class OpportunityDirectoryComponent implements OnInit {
  public p:number=1;
  public totalPages:number=0;
  banner: iBanner = {
    title: this.translate.instant('opportunitiesModule.bannerTitle.mainTitle'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
      { title: this.translate.instant('bannerData.breadCrump.opportunitiesList'), link: '/dcc/services/opportunities' }, 
       ],
    subbreadCrump: [""],
    
  }
  constructor(public model:LeadOpportunityList, public translate:TranslateService) { }

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
