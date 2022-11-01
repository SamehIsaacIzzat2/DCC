import { Component, Input, OnInit } from '@angular/core';
import { RequestFinalResult } from 'src/app/DCP/requests/components/request-final-details/request-final-result.model';

@Component({
  selector: 'app-lead-final-details',
  templateUrl: './lead-final-details.component.html',
  styleUrls: ['./lead-final-details.component.scss'],
  providers:[RequestFinalResult]

})
export class LeadFinalDetailsComponent implements OnInit {
  @Input() itemDetails:any;

  constructor(public model:RequestFinalResult) { 
    this.model.getdataLeads();
  }

  ngOnInit(): void {
  }

}
