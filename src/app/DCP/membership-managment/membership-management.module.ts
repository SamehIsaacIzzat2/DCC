import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/SharedModule/shared.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberShipRoutingModule } from './membership-routing.module';
import { RequestDetailsPageComponent } from './pages/request-details-page/request-details-page.component';
import { RequestResultActionsComponent } from './components/request-result-actions/request-result-actions.component';
import { LastUpdateCardComponent } from './components/last-update-card/last-update-card.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { DocumentsPageComponent } from './pages/documents-page/documents-page.component';
import { NewMessagePageComponent } from './pages/new-message-page/new-message-page.component';
import { LicenseInfoComponent } from './components/license-info/license-info.component';
import { AttachmentsMembershipComponent } from './components/attachments-membership/attachments-membership.component';
import { RequestResultComponent } from './components/request-result/request-result.component';
import { BankTransferModalComponent } from './components/request-result/bank-transfer-modal/bank-transfer-modal.component';
import { CompanyViewComponent } from './components/company-view/company-view.component';
import { CompanyInformationComponent } from './components/company-information/company-information.component';
import { NewMemberShipPageComponent } from './pages/new-membership/new-membership-page.component';
import { RenewMemberShipPageComponent } from './pages/renew-membership/renew-membership-page.component';
import { CancleMembershipPageComponent } from './pages/cancle-membership-page/cancle-membership-page.component';
import { PayWalletComponent } from './components/request-result/pay-wallet/pay-wallet.component';
import { PaymentListPageComponent } from './pages/payment-list-page/payment-list-page.component';
import { PaymentListFilterComponent } from './components/payment-list-filter/payment-list-filter.component';
import { RenewLicenceInfoComponent } from './pages/renew-membership/components/renew-licence-info/renew-licence-info.component';
import { RenewCompanyInfoComponent } from './pages/renew-membership/components/renew-company-info/renew-company-info.component';
import { RenewAttchmentsComponent } from './pages/renew-membership/components/renew-attchments/renew-attchments.component';
import{RequestCardComponent}from'./components/request-result/request-card/request-card.component';
@NgModule({
  declarations: [
    RequestDetailsPageComponent,
    RequestResultActionsComponent,
    LastUpdateCardComponent,
    MessagesComponent,
    NewMessageComponent,
    DocumentsPageComponent,
    NewMessagePageComponent,
    CompanyInformationComponent,
    LicenseInfoComponent,
    AttachmentsMembershipComponent,
    RequestResultComponent,
    BankTransferModalComponent,
    CompanyViewComponent,
    NewMemberShipPageComponent,
    RenewMemberShipPageComponent,
    CancleMembershipPageComponent,
    PayWalletComponent,
    PaymentListPageComponent,
    PaymentListFilterComponent,
    RenewLicenceInfoComponent,
    RenewCompanyInfoComponent,
    RenewAttchmentsComponent,
    RequestCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MemberShipRoutingModule,
    TranslateModule,
    InputMaskModule
  ],
})
export class MemberShipManagementModule {}
