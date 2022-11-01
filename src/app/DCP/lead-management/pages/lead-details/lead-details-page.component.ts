import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, take } from 'rxjs';
import { filterCompany } from 'src/app/DCP/requests/page/request-details-page/filter.model';
import { LeadDetailsPageModel } from './lead-details-page.model';

@Component({
  selector: 'app-lead-details-page',
  templateUrl: './lead-details-page.component.html',
  styleUrls: ['./lead-details-page.component.scss'],
  providers:[LeadDetailsPageModel]
})
export class LeadDetailsPageComponent implements OnInit {
  public p:number=1;
  public totalPages:number=0;

  products: Observable<any[]>;
  industrys: Observable<any[]>;
  activities: Observable<any[]>;
  locations: Observable<any[]>;
  sortBy: Observable<any[]>;
  sortBySelected:number[]=[];
  activePage = 1;
  constructor(public model: LeadDetailsPageModel,private active: ActivatedRoute) {
    this.getId();
   }

  ngOnInit(): void {
  }

  filterReq(evt:Event,opt:number,optionType:string){
   

  }

  
  getId() {
    this.active.params.pipe(take(1), pluck("id")).subscribe((id) => {
      this.model.id = id;
      if (this.model.id) {
        let filter= new filterCompany();
        //filter.id = this.model.id;
        filter.id = id;
        this.model.getData(filter );
        //this.model.getDataInteractions(filter.id);
      }
    })
  }

  getInteractions(){
    console.log("schools :> " );
  }

  changePage(data:any){

    this.totalPages=Math.ceil(this.model.interactionsData.length /5);
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
