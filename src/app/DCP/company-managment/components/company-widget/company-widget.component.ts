import { Component, Input, OnInit } from '@angular/core';
import { IRequestData } from 'src/app/SharedModule/Components/request-widget/iReuestData';
import { ICompanyData } from './iCompanyData';

@Component({
  selector: 'app-company-widget',
  templateUrl: './company-widget.component.html',
  styleUrls: ['./company-widget.component.scss']
})
export class CompanyWidgetComponent implements OnInit {
  @Input() item: ICompanyData;
  constructor() { }

  ngOnInit(): void {
  }

}
