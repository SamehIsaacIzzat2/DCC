import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges,ViewChild } from '@angular/core';
import { map, Observable, startWith, takeUntil } from 'rxjs';
import { CreateRequest } from './create-request.model';
import { createRequestModel } from '../../page/create-request-page/crreate-request.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
@Component({
  selector: 'create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  providers: [CreateRequest]
})
export class CreateRequestComponent implements OnInit, OnChanges {

  //===================Data====================================
  @Output() setData = new EventEmitter();
  @Output() setDetailsData = new EventEmitter();
  @Input() details: Observable<any>;
  @Input() pageModel: createRequestModel;

  @ViewChild('prodVal', {read: MatAutocompleteTrigger}) productAutoComplete: MatAutocompleteTrigger;
  @ViewChild('indust', {read: MatAutocompleteTrigger}) industryAutoComplete: MatAutocompleteTrigger;
  @ViewChild('act', {read: MatAutocompleteTrigger}) acticityAutoComplete: MatAutocompleteTrigger;
  @ViewChild('countryAutoComplete', {read: MatAutocompleteTrigger}) countryAutoComplete: MatAutocompleteTrigger;
  @ViewChild('cityAutoComplete', {read: MatAutocompleteTrigger}) cityAutoComplete: MatAutocompleteTrigger;

  constructor(public model: CreateRequest) {
  }
  ngOnInit(): void {
    this.model.checkEditMode();
    // (this.model.setFilteration()).subscribe(() => {
    //   this.model.setDataFunc(true);
    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //setting inputs and outputs of component in model
    this.model.pageModel = this.pageModel;
    this.model.setData = this.setData;
    this.model.setDetailsData = this.setDetailsData;
  }

  openProductPanel(evt:any):void{
    evt.stopPropagation();
    this.productAutoComplete.openPanel();
  }
  openIndustryPanel(evt:any):void{
    evt.stopPropagation();
    this.industryAutoComplete.openPanel();
  }
  openActivityPanel(evt:any):void{
    evt.stopPropagation();
    this.acticityAutoComplete.openPanel();
  }
  openCountryPanel(evt:any):void{
    evt.stopPropagation();
    this.countryAutoComplete.openPanel();
  }
  openCityPanel(evt:any):void{
    evt.stopPropagation();
    this.cityAutoComplete.openPanel();
  }

}
