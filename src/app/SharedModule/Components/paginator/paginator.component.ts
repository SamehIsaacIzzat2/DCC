import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

 //events
 @Input() isCompanyPager:boolean=false;
 @Output() pageBoundsCorrection=new EventEmitter<number>();
 @Output() pageChange=new EventEmitter<number>();

  constructor(public langSer:LanguageService) {}

  ngOnInit(): void {}

  //==========================logic==================================
  changePage(eventData:number){
    this.pageChange.emit(eventData);
  }
  
  boundCorrection(data:number){
    this.pageChange.emit(1);
    this.pageBoundsCorrection.emit(data);
  }

}
