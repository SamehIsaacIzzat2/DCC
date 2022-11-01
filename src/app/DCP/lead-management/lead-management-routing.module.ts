import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInteractionResultComponent } from './components/create-interaction-result/create-interaction-result.component';
import { CreateInteractionComponent } from './components/create-interaction/create-interaction.component';
import { InteractionDetailsComponent } from './components/interaction-details/interaction-details.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { LeadDetailsComponent } from './components/lead-details/lead-details.component';
import { MessagesComponent } from './components/messages/messages.component';
import { OpportunityleadComponent } from './components/opportunitylead/opportunitylead.component';
import { ReferralDetailsComponent } from './components/referralDetails/referralDetails.component';
import { ReferralsListComponent } from './components/referralsList/referralsList.component';
import { SendMessageComponent } from './pages/sendMessage/sendMessage.component';
import { CreateInteractionPageComponent } from './pages/create-interaction-page/create-interaction-page.component';
import { LeadDetailsPageComponent } from './pages/lead-details/lead-details-page.component';
import { ListOfLeadsComponent } from './pages/list-of-leads/list-of-leads.component';
import { ShowCompanyDetailsComponent } from './components/show-company-details/show-company-details.component';
import { CompanyInfoComponent } from 'src/app/SharedModule/Components/company-info/company-info.component';

const routes: Routes = [
  { path: '', component: ListOfLeadsComponent },
  {
    path: 'leadDetails/:id',
    component: LeadDetailsPageComponent,
    children: [
      { path: 'leadinfo', component: LeadDetailsComponent },
      { path: 'interactionlist', component: InteractionsComponent },
      {path :'companyDetails/:companyId' ,component:ShowCompanyDetailsComponent},
     
      { path: 'interactionlist/:interactionid', component: InteractionDetailsComponent },

      { path: 'opportunity', component: OpportunityleadComponent },
      { path: 'referralsList', component: ReferralsListComponent },
      {
        path: 'referralsList/:referralId',
        component: ReferralDetailsComponent,
      },
      { path: 'messages', component: MessagesComponent },
      { path: '', redirectTo: 'leadinfo' },
 

    ],
  },
  { path: ':leadId/companyInfo/:companyId', component: CompanyInfoComponent },
  {
    path: 'createInteraction/:leadId',
    component: CreateInteractionPageComponent,
  },
  { path: 'details', component: InteractionDetailsComponent },
  { path: 'result', component: CreateInteractionResultComponent },
  { path: 'sendMessage/:id', component: SendMessageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadManagementRoutingModule {}
