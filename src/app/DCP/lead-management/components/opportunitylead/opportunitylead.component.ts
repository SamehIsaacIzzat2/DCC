import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityLeadModel } from './opportunity-lead.model';

@Component({
  selector: 'app-opportunitylead',
  templateUrl: './opportunitylead.component.html',
  styleUrls: ['./opportunitylead.component.scss'],
  providers:[OpportunityLeadModel]
})
export class OpportunityleadComponent implements OnInit {

  constructor(public model:OpportunityLeadModel,router: Router) {
    
   }

  ngOnInit(): void {
  }


}
