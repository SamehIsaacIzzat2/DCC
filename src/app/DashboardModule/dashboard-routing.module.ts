import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { UnAuthorizedGuard } from '../CallerModule/RoutingGuards/unAuthorized.guard';

export const dashboardRoutes: Routes = [
  {   path: '', component: DashboardComponent ,
  canActivate: [UnAuthorizedGuard] 

     //canActivate: [AutherizedGuard] 
  },
  { path: 'dashboard', component: DashboardComponent ,
  canActivate: [UnAuthorizedGuard] 
    // canActivate: [AutherizedGuard] 
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],

  exports: [RouterModule]
})

export class DashboardRoutingModule { }
