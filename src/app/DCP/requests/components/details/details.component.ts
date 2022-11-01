import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { RequestData } from './Icreate-request';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //======================================Data=============================================
  @Input() data:any;
  constructor() {
  }

  ngOnInit(): void {
  }

}

