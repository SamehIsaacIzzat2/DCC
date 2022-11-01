import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InteractionsListModel } from './Interactions-list.model';

@Component({
  selector: 'interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss'],
  providers:[InteractionsListModel]
})
export class InteractionsComponent implements OnInit {
  LeadStatus:string|undefined;
  public p:number=1;

  public totalPages:number=0;

  //*************************************************Data************************************************ */
  @Input() public interactionsList:any;
  @Input() public data:any;
  id:string;
  constructor(public model:InteractionsListModel,router: Router,public translate:TranslateService) {
    let URL = router.url;
    let URL_AS_LIST = URL.split('/');
    this.id=URL_AS_LIST[4];
    this.LeadStatus =localStorage.getItem("LeadStatus")?.toString();

   }

  ngOnInit(): void {
    this.model.getDataInteractions(this.id);
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
