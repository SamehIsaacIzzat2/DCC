import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputMaskModule } from '@ngneat/input-mask';
import { CompanyViewComponent } from './components/company-view/company-view.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { RequestResultActionsComponent } from './components/request-result-actions/request-result-actions.component';
import { RequestResultComponent } from './components/request-result/request-result.component';
import { DocumentsPageComponent } from './pages/documents-page/documents-page.component';
import { NewMessagePageComponent } from './pages/new-message-page/new-message-page.component';
import { NewMemberShipPageComponent } from './pages/new-membership/new-membership-page.component';
import { RenewMemberShipPageComponent } from './pages/renew-membership/renew-membership-page.component';
import { RequestDetailsPageComponent } from './pages/request-details-page/request-details-page.component';
import { CancleMembershipPageComponent } from './pages/cancle-membership-page/cancle-membership-page.component';

const routes: Routes = [
  // 
  {path:"request-result",component:RequestResultComponent},
//  { path: '', redirectTo: 'new-membership' },
  {path:'new-membership',component:NewMemberShipPageComponent},
  {path:'new-membership/:id',component:NewMemberShipPageComponent},
  {path:'renew-membership',component:RenewMemberShipPageComponent},
  {path:'cancel-membership',component:CancleMembershipPageComponent},
  {path:"documents",component:DocumentsPageComponent},
  {path:'request-details/:membershipId',component:RequestDetailsPageComponent,children:[
  {path:'',redirectTo:'requestInfo'},
  {path:'requestInfo' ,component:CompanyViewComponent},
  {path:'request-result-actions' ,component:RequestResultActionsComponent},
  {path:'request-messages' ,component:MessagesComponent},
  

  ]},
  {
    path:'new-message/:id' ,component:NewMessagePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),],
  exports: [RouterModule],
})
export class MemberShipRoutingModule {}
