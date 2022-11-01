import { Component, OnInit } from '@angular/core';
import { RequestResultActionsModel } from './request-result-actions.model';

@Component({
  selector: 'app-request-result-actions',
  templateUrl: './request-result-actions.component.html',
  styleUrls: ['./request-result-actions.component.scss'],
  providers:[RequestResultActionsModel]
})
export class RequestResultActionsComponent implements OnInit {

  constructor(public model:RequestResultActionsModel) { }

  ngOnInit(): void {
  }

}
