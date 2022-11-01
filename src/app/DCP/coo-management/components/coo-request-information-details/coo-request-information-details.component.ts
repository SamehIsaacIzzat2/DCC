import { Component, OnInit } from '@angular/core';
import { RequestInformationModel } from './request-information.model';

@Component({
  selector: 'app-coo-request-information-details',
  templateUrl: './coo-request-information-details.component.html',
  styleUrls: ['./coo-request-information-details.component.scss'],
  providers:[RequestInformationModel]
})
export class CooRequestInformationDetailsComponent implements OnInit {

  constructor(public model:RequestInformationModel) { }

  ngOnInit(): void {
  }

}
