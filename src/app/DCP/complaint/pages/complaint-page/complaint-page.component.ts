import { Component, OnInit } from '@angular/core';
import { complaintPageModel } from './complaint-page.model';

@Component({
  selector: 'app-complaint-page',
  templateUrl: './complaint-page.component.html',
  styleUrls: ['./complaint-page.component.scss'],
  providers: [complaintPageModel]
})
export class ComplaintPageComponent implements OnInit {

  constructor(public model: complaintPageModel) { }

  ngOnInit(): void {
  }

}
