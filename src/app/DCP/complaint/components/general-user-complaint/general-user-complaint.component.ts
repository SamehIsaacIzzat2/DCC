import { Component, OnInit, OnDestroy } from '@angular/core';
import { generalcomplaintPageModel } from './general-user-complaint.model';

@Component({
  selector: 'general-user-complaint',
  templateUrl: './general-user-complaint.component.html',
  styleUrls: ['./general-user-complaint.component.scss'],
  providers: [generalcomplaintPageModel]
})
export class GeneralUserComplaintComponent implements OnInit,OnDestroy {

  constructor(public model: generalcomplaintPageModel) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.model.endSubs()
  }

}
