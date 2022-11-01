import { Component, OnInit } from '@angular/core';
import { IntrtactionDetailsModel } from './intrtaction-details-model';

@Component({
  selector: 'app-interaction-details',
  templateUrl: './interaction-details.component.html',
  styleUrls: ['./interaction-details.component.scss'],
  providers:[IntrtactionDetailsModel]
})
export class InteractionDetailsComponent implements OnInit {


  //***************************Fake Data Remove it when use actual Data**************************** */
  // public item:any={
  //   id: "le01",
  //   interactionType: 2,
  //   interactionTypeName: "meeting",
  //   leadCreatedOn: "2022-08-25T15:13:13.5862764+00:00",
  //   leadName: "Lead name 1",
  //   proposedDateTime: "2022-08-25",
  //   status: 1,
  //   statusName: "Pending"
  // }

  constructor(public model:IntrtactionDetailsModel) { }

  ngOnInit(): void {
  }

}
