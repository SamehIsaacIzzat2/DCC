import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { requestDetailsPageModel } from './request-details-page.model';
import { map, Observable, pluck, startWith, take } from 'rxjs';
import { filterCompany } from './filter.model';

@Component({
  selector: 'app-request-details-page',
  templateUrl: './request-details-page.component.html',
  styleUrls: ['./request-details-page.component.scss'],
  providers: [requestDetailsPageModel]
})
export class RequestDetailsPageComponent implements OnInit {
  products: Observable<any[]>;
  industrys: Observable<any[]>;
  activities: Observable<any[]>;
  locations: Observable<any[]>;
  sortBy: Observable<any[]>;
  sortBySelected:number[]=[];
  activePage = 1;
  constructor(public model: requestDetailsPageModel, private active: ActivatedRoute) {
    this.getId();
   }

  ngOnInit(): void {
    this.setFilteration();
  }
  filterReq(evt:Event,opt:number,optionType:string){
   
    
    if ((evt.srcElement as any).checked) {
      this.sortBySelected.push(opt)
      this.model.ApplyFilter(this.sortBySelected);     

    } else {
      this.sortBySelected= this.sortBySelected.filter(x=>x != opt)

      this.model.ApplyFilter(this.sortBySelected);

    }

  }

  getId() {
    this.active.params.pipe(take(1), pluck("id")).subscribe((id) => {
      this.model.id = id;
      if (this.model.id) {
        let filter= new filterCompany();
        filter.id = this.model.id;
        this.model.getData(filter );
        this.model.getselectData(this.model.id);

      }
    })
  }

  setFilteration() {
    this.products = this.model.requestData.controls['products'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.productData, value || '')),
    );
    this.industrys = this.model.requestData.controls['industries'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.industryData, value || '')),
    );
    this.activities = this.model.requestData.controls['interests'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.activityData, value || '')),
    );
    this.locations = this.model.requestData.controls['locations'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.locationData, value || '')),
    );
    this.sortBy = this.model.requestData.controls['sortBy'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.sortByData, value || '')),
    );
}

private _filter(arr: any[], value: any): string[] {
  let filterValue="";
  if(value.name)
  {
    filterValue = value.name.toLowerCase();
  }
  else 
  {
    filterValue = value.toLowerCase();
  }
  
  return arr.filter(option => option.name.toLowerCase().includes(filterValue));
}
itemDisplayFn(item: any) {
  return item? item.name: '';
}


}
