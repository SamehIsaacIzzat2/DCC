import { EditSocialInformationComponent } from './../../../components/edit-social-information/edit-social-information.component';
import { EditContactInformationComponent } from './../../../components/edit-contact-information/edit-contact-information.component';
import { EditGeneralInformationComponent } from './../../../components/edit-general-information/edit-general-information.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { completeProfileModel } from './complete-profile-page.model';
import { EditAddressInformationComponent } from 'src/app/profile/components/edit-address-information/edit-address-information.component';

@Component({
  selector: 'app-complete-profile-page',
  templateUrl: './complete-profile-page.component.html',
  styleUrls: ['./complete-profile-page.component.scss'],
  providers: [completeProfileModel]
})
export class CompleteProfilePageComponent implements OnInit,AfterViewInit {
  @ViewChild(EditGeneralInformationComponent) editGeneralInfoComp: EditGeneralInformationComponent;
  @ViewChild(EditAddressInformationComponent) editAdressInfoComp: EditAddressInformationComponent;
  @ViewChild(EditContactInformationComponent) editContactInfoComp: EditContactInformationComponent;
  @ViewChild(EditSocialInformationComponent) editSocailInfoComp: EditSocialInformationComponent;
  constructor(public model: completeProfileModel) { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.model.editGeneralInfoComp = this.editGeneralInfoComp;
    this.model.editAdressInfoComp = this.editAdressInfoComp;
    this.model.editContactInfoComp = this.editContactInfoComp;
    this.model.editSocialInfoComp = this.editSocailInfoComp;
  }

}
