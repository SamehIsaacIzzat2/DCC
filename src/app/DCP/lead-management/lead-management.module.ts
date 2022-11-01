import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LeadManagementRoutingModule } from './lead-management-routing.module';
import { ListOfLeadsComponent } from './pages/list-of-leads/list-of-leads.component';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { LeadmanagmentdirectoryComponent } from './components/leadmanagmentdirectory/leadmanagmentdirectory.component';
import { LeadfilterComponent } from './components/leadfilter/leadfilter.component';
import { LeadWidgetComponent } from './components/lead-widget/lead-widget.component';
import { LeadDetailsPageComponent } from './pages/lead-details/lead-details-page.component';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestFinalDetailsComponent } from '../requests/components/request-final-details/request-final-details.component';
import { LeadFinalDetailsComponent } from './components/lead-final-details/lead-final-details.component';
import { CreateInteractionComponent } from './components/create-interaction/create-interaction.component';
import { LeadDetailsComponent } from './components/lead-details/lead-details.component';
import { InteractionDetailsComponent } from './components/interaction-details/interaction-details.component';
import { CreateInteractionResultComponent } from './components/create-interaction-result/create-interaction-result.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { CreateInteractionPageComponent } from './pages/create-interaction-page/create-interaction-page.component';
import { OpportunityleadComponent } from './components/opportunitylead/opportunitylead.component';
import { ReferralsListComponent } from './components/referralsList/referralsList.component';
import { ReferralDetailsComponent } from './components/referralDetails/referralDetails.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SendMessageComponent } from './pages/sendMessage/sendMessage.component';
import { SendMessageResultComponent } from './components/send-message-result/send-message-result.component';
import { ShowCompanyDetailsComponent } from './components/show-company-details/show-company-details.component';

@NgModule({
  declarations: [
    ListOfLeadsComponent,
    LeadmanagmentdirectoryComponent,
    LeadfilterComponent,
    LeadWidgetComponent,
    LeadDetailsPageComponent,
    LeadFinalDetailsComponent,
    CreateInteractionComponent,
    LeadDetailsComponent,
    InteractionDetailsComponent,
    CreateInteractionResultComponent,
    InteractionsComponent,
    CreateInteractionPageComponent,
    OpportunityleadComponent,
    ReferralsListComponent,
    ReferralDetailsComponent,
    MessagesComponent,
    SendMessageComponent,
    SendMessageResultComponent,
    ShowCompanyDetailsComponent,
  ],
  imports: [
    CommonModule,
    LeadManagementRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class LeadManagementModule {}
