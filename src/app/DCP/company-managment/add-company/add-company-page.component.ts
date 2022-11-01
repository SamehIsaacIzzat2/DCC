import { EditContactInfoComponent } from './../company-profile/components/edit-contact-info/edit-contact-info.component';
import { EditSocialInfoComponent } from './../company-profile/components/edit-social-info/edit-social-info.component';
import { EditGeneralInfoComponent } from './../company-profile/components/edit-general-info/edit-general-info.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AddCompanyModel } from './add-company-page.model';

@Component({
  selector: 'app-add-company-page',
  templateUrl: './add-company-page.component.html',
  styleUrls: ['./add-company-page.component.scss'],
  providers: [AddCompanyModel]
})
export class AddCompanyPageComponent implements OnInit,AfterViewInit {
  @ViewChild(EditGeneralInfoComponent) editGeneralInfoComp: EditGeneralInfoComponent;
  @ViewChild(EditContactInfoComponent) editContactInfoComp: EditContactInfoComponent;
  @ViewChild(EditSocialInfoComponent) editSocailInfoComp: EditSocialInfoComponent;
  constructor(public model: AddCompanyModel) { }
  ngAfterViewInit(): void {
      this.model.editGeneralInfoComp = this.editGeneralInfoComp;
    this.model.editAdressInfoComp = this.editContactInfoComp;
      this.model.editSocialInfoComp = this.editSocailInfoComp;
  }

  ngOnInit(): void {
  }

}
