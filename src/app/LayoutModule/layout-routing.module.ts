import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from '../CallerModule/RoutingGuards/authorized.guard';
import { UnAuthorizedGuard } from '../CallerModule/RoutingGuards/unAuthorized.guard';
import { DICGuard } from '../CallerModule/RoutingGuards/dic.guard';
import { DCCGuard } from '../CallerModule/RoutingGuards/dcc.guard';
import { LayoutComponent } from './Components/Layout/layout.component';

const layoutRoutes: Routes = [
  //======Landing Module==============
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'services' },
      {
        path: 'services',
        // canActivate: [AuthorizedGuard],
        loadChildren: () =>
          import('../DCP/services-catalog/services-catalog.module').then(
            (m) => m.ServicesCatalogModule
          ),
      },
      {
        path: 'requests',
        canActivate: [AuthorizedGuard],
        loadChildren: () =>
          import('../DCP/requests/requests.module').then(
            (m) => m.RequestsModule
          ),
      },
      {
        path: 'leads',
        canActivate: [AuthorizedGuard,DICGuard],
        loadChildren: () =>
          import('../DCP/lead-management/lead-management.module').then(
            (m) => m.LeadManagementModule
          ),
      },
      {
        path: 'opportunities',
        canActivate: [AuthorizedGuard,DICGuard],
        loadChildren: () =>
          import(
            '../DCP/opportunity-managment/opportunity-management.module'
          ).then((m) => m.OpportunityManagementModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../DCP/event-managment/event-management.module').then(
            (m) => m.EventManagementModule
          ),
      },
      {
        path: 'complaint',
        loadChildren: () =>
          import('../DCP/complaint/complaint.module').then(
            (m) => m.ComplaintModule
          ),
      },
    ],
  },
  {
    path: 'identity',
    component: LayoutComponent,
    canActivate: [UnAuthorizedGuard],
    loadChildren: () =>
      import('../IdentityModule/identity.module').then(
        (mod) => mod.IdentityModule
      ),
  },
  {
    path: 'profile',
    component: LayoutComponent,
    canActivate: [AuthorizedGuard],
    loadChildren: () =>
      import('../profile/profile.module').then((mod) => mod.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
