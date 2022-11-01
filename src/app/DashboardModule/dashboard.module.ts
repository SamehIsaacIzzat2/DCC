import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../SharedModule/shared.module';
import { AngularMaterialModule } from '../AngularMaterialModule/angularMaterialModule.module';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { DashboardWidgetListComponent } from './Components/DashboardWidgetList/dashboardWidgetList.component';

@NgModule({
  imports:[
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent, DashboardWidgetListComponent ],
})

export class DashboardModule {  }
