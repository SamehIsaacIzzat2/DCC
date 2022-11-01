import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from '../lead-management/components/messages/messages.component';
import { ReferralDetailsComponent } from '../lead-management/components/referralDetails/referralDetails.component';
import { ReferralsListComponent } from '../lead-management/components/referralsList/referralsList.component';
import { SendMessageComponent } from '../lead-management/pages/sendMessage/sendMessage.component';
import { OpportunityInfoComponent } from './components/opportunity-info/opportunity-info.component';
import { ListOfOpportunitiesComponent } from './pages/list-of-opportunity/list-of-opportunities.component';
import { OpportunityDetailsPageComponent } from './pages/opportunity-details-page/opportunity-details-page.component';

const routes: Routes = [
  {path:'',component:ListOfOpportunitiesComponent},
  {path: 'opportunityDetails/:id',component: OpportunityDetailsPageComponent,
children:[
  {path:'opportunityinfo',component:OpportunityInfoComponent},
  {path:'opportunityreferals',component:ReferralsListComponent},
  {
    path: 'opportunityreferals/:referralId',component: ReferralDetailsComponent
  },
  { path: 'messages', component: MessagesComponent },



]},
{ path: 'sendMessage/:id', component: SendMessageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityManagementRoutingModule { }
