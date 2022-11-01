import { Component, Input, OnInit } from '@angular/core';
import { DetailsItem } from './Interfaces';

@Component({
  selector: 'generic-display-details',
  templateUrl: './generic-display-details.component.html',
  styleUrls: ['./generic-display-details.component.scss']
})
export class GenericDisplayDetailsComponent implements OnInit {

  //***************************************Inputs and outputs***************************************** */
  @Input() items:DetailsItem[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  isArray(item:any){
    return Array.isArray(item);
  }

}
