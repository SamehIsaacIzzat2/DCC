import { Component, OnInit } from '@angular/core';
import { SideFilterModel } from './side-filter-model';

@Component({
  selector: 'side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss'],
  providers:[SideFilterModel]
})
export class SideFilterComponent implements OnInit {

  constructor(public model:SideFilterModel) { }

  ngOnInit(): void {
  }

}
