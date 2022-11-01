import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/SharedModule/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from 'src/app/AngularMaterialModule/angularMaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEventsPageComponent } from './pages/list-events-page/list-events-page.component';
import { RegisterEventsPageComponent } from './pages/register-events-page/register-events-page.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventsCatalogRoutingModule } from './events-catalog-routing.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventRegisterCardComponent } from './components/event-register-card/event-register-card.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';
import { RedirectRegistrationEventPageComponent } from './pages/redirect-registration-event-page/redirect-registration-event-page.component';
import { EventFilterComponent } from './components/event-filter/event-filter.component';
@NgModule({
  declarations: [
    ListEventsPageComponent,
    RegisterEventsPageComponent,
    EventListComponent,
    EventCardComponent,
    EventRegisterCardComponent,
    RegisterEventComponent,
    RedirectRegistrationEventPageComponent,
    EventFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EventsCatalogRoutingModule,
    TranslateModule,
  ],
})
export class EventManagementModule {}
