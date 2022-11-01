import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LicenseInfoComponent } from '../../components/license-info/license-info.component';
import { CompanyInformationComponent } from '../../components/company-information/company-information.component';
import { AttachmentsMembershipComponent } from '../../components/attachments-membership/attachments-membership.component';
import { RenewMembershipModel } from './renew-membership-page.model';
import { RenewLicenceInfoComponent } from './components/renew-licence-info/renew-licence-info.component';

@Component({
  selector: 'renew-membership-company-page',
  templateUrl: './renew-membership-page.component.html',
  styleUrls: ['./renew-membership-page.component.scss'],
  providers: [RenewMembershipModel],
})
export class RenewMemberShipPageComponent implements OnInit, AfterViewInit {
  @ViewChild("LicenseInfoComponent") licenseInfoComponent: RenewLicenceInfoComponent;
  @ViewChild(CompanyInformationComponent) CompanyInformationComponent: CompanyInformationComponent;
  @ViewChild(AttachmentsMembershipComponent) AttachmentsMembershipComponent: AttachmentsMembershipComponent;
  constructor(public model: RenewMembershipModel) {}
  ngAfterViewInit(): void {
    this.model.licenseRenew = this.licenseInfoComponent;
    this.model.CompanyInformationComponent = this.CompanyInformationComponent;
    this.model.AttachmentsMembershipComponent = this.AttachmentsMembershipComponent;
  }

  ngOnInit(): void {
    this.model.getSelectData()
  }
}
