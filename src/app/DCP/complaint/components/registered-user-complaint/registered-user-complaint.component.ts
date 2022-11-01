import { Component, OnInit, OnDestroy } from '@angular/core';
import { registeredcomplaintPageModel } from './registered-user-complaint.model';

@Component({
  selector: 'registered-user-complaint',
  templateUrl: './registered-user-complaint.component.html',
  styleUrls: ['./registered-user-complaint.component.scss'],
  providers: [registeredcomplaintPageModel]
})
export class RegisteredUserComplaintComponent implements OnInit,OnDestroy {

  constructor(public model: registeredcomplaintPageModel) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.model.endSubs()
  }
  displayWith(obj?: any): string {
    return obj ? obj.name : '';
  }



}
