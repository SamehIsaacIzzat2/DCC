import { Component, OnInit } from '@angular/core';
import { RequestDetailsPageModel } from './request-details-page.model';

@Component({
  selector: 'app-request-details-page',
  templateUrl: './request-details-page.component.html',
  styleUrls: ['./request-details-page.component.scss'],
  providers:[RequestDetailsPageModel]
})
export class RequestDetailsPageComponent implements OnInit {

  constructor(public model:RequestDetailsPageModel) { }

  ngOnInit(): void {
  }

}
