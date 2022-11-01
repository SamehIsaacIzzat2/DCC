import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestFinalResult } from './request-final-result.model';

@Component({
  selector: 'request-final-details',
  templateUrl: './request-final-details.component.html',
  styleUrls: ['./request-final-details.component.scss'],
  providers:[RequestFinalResult]
})
export class RequestFinalDetailsComponent implements OnInit {
  @Input() itemDetails:any;
  constructor(public model:RequestFinalResult,private active:ActivatedRoute) {
    this.model.getData();

  }


  ngOnInit(): void {
  }

}
