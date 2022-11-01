import { Component, EventEmitter, Injectable, OnInit, OnDestroy } from '@angular/core';
import { createRequestModel } from './crreate-request.model';



@Component({
  selector: 'app-create-request-page',
  templateUrl: './create-request-page.component.html',
  styleUrls: ['./create-request-page.component.scss'],
  providers: [createRequestModel]
})
export class CreateRequestPageComponent implements OnInit,OnDestroy {
  //constructor
  constructor(public model: createRequestModel) { }
  // on Init
  ngOnInit(): void {
  }
  // on Destroy
  ngOnDestroy(): void {
    this.model.endSubs();
  }
}
