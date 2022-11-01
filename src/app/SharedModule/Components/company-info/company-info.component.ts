import { Component, OnInit } from '@angular/core';
import { CompanyInfoModel } from './company-info.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  providers:[CompanyInfoModel]
})
export class CompanyInfoComponent implements OnInit {

  constructor(public model:CompanyInfoModel) { }

  ngOnInit(): void {
   
  }

}
