import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsPageComponent } from './pages/list-events-page/list-events-page.component';
import { RedirectRegistrationEventPageComponent } from './pages/redirect-registration-event-page/redirect-registration-event-page.component';
import { RegisterEventsPageComponent } from './pages/register-events-page/register-events-page.component';

const routes: Routes = [
  {path: "",component:ListEventsPageComponent}  ,
  {path: "event-register",component:RegisterEventsPageComponent}  ,
  {path:"redirectToRegister", component:RedirectRegistrationEventPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsCatalogRoutingModule { }
