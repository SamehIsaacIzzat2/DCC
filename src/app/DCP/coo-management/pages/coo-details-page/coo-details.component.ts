import { Component, OnInit } from '@angular/core';
import { DetailsPageModel } from './details-page.model';

@Component({
  selector: 'app-coo-details',
  templateUrl: './coo-details.component.html',
  styleUrls: ['./coo-details.component.scss'],
  providers:[DetailsPageModel]
})
export class CooDetailsComponent implements OnInit {

  constructor(public model:DetailsPageModel) { }

  ngOnInit(): void {
  }

}
