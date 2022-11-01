import { Component, OnInit, ViewChild } from '@angular/core';
import { companyInformationModel } from './company-information.model';
import { FormModalService } from '../../../../SharedModule/Components/form-modal/form-modal.service';
import { TranslateService, } from '@ngx-translate/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
@Component({
  selector: 'company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss'],
  providers: [companyInformationModel]
})
export class CompanyInformationComponent implements OnInit {


  @ViewChild('prodValu', {read: MatAutocompleteTrigger}) activityAutoComplete: MatAutocompleteTrigger;
  @ViewChild('specialProdVal', {read: MatAutocompleteTrigger}) specialActivityAutoComplete: MatAutocompleteTrigger;

  constructor(
    public model: companyInformationModel,
    private modalService: FormModalService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.model.getSelectData();
  }

  addPartner(){
    this.modalService.show('addPartner');
  }

  openActivityPanel(event:any): void{
    event.stopPropagation();
    this.activityAutoComplete.openPanel();
  }

  openSpecialActivityPanel(event:any): void{
    event.stopPropagation();
    this.specialActivityAutoComplete.openPanel();
  }

}
