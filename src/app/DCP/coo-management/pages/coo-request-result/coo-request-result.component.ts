import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RequestResultModel } from './request-result.model';

@Component({
  selector: 'app-coo-request-result',
  templateUrl: './coo-request-result.component.html',
  styleUrls: ['./coo-request-result.component.scss'],
  providers:[RequestResultModel]
})
export class CooRequestResultComponent implements OnInit ,OnChanges{
  @Input() requestId:string='';
  constructor(public model:RequestResultModel) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.model.requestId=this.requestId;
  }

  ngOnInit(): void {
    this.model.requestId=this.requestId;
  }

}
