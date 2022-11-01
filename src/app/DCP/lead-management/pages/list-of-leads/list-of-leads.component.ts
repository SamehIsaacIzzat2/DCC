import { Component, OnInit } from '@angular/core';
import { LeadList } from '../../components/leadmanagmentdirectory/list-of-leads.model';

@Component({
  selector: 'app-list-of-leads',
  templateUrl: './list-of-leads.component.html',
  styleUrls: ['./list-of-leads.component.scss'],
  providers:[LeadList]
})
export class ListOfLeadsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
