import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { CompanyList } from './list-company.model';

@Component({
  selector: 'app-list-comapnys',
  templateUrl: './list-comapnys.component.html',
  styleUrls: ['./list-comapnys.component.scss'],
  providers:[CompanyList]
})
export class ListComapnysComponent implements OnInit {
  public p:number=1;
  public totalPages:number=0;
  banner: iBanner = {
    title: this.translate.instant('companyModule.list.companiesList'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home') ,link:'/services'},
      { title: this.translate.instant('bannerData.breadCrump.companies') ,link:'/services/companys'},
    ]
  }
  constructor(public model: CompanyList,private translate:TranslateService) { }

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
