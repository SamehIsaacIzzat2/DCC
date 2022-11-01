import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RequestData } from './IRequest-Details';
import { itemCompany } from './itemcompany';

@Component({
  selector: 'request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {

  //===========================data=====================================

  @Input() item: any;
  @Input() itemcompany:itemCompany;
  constructor() { }
  ngOnInit(): void {
  }

}
