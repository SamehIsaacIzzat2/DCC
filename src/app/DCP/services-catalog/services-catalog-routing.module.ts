import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { ServiceMembershipDetailsComponent } from './components/service-membership-details/service-membership-details.component';
import { ServiceDirectoryComponent } from './components/service-directory/service-directory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from 'src/app/CallerModule/RoutingGuards/authorized.guard';
import { DICGuard } from 'src/app/CallerModule/RoutingGuards/dic.guard';
import { DCCGuard } from 'src/app/CallerModule/RoutingGuards/dcc.guard';
import { CancleMembershipPageComponent } from '../membership-managment/pages/cancle-membership-page/cancle-membership-page.component';
import { DocumentsPageComponent } from '../membership-managment/pages/documents-page/documents-page.component';
import { PaymentListPageComponent } from '../membership-managment/pages/payment-list-page/payment-list-page.component';

const routes: Routes = [
  { path: '', component: ServiceDirectoryComponent },
  { path: 'details', component: ServiceDetailsComponent },
  { path: 'membership-details', component: ServiceMembershipDetailsComponent },
  {
    path: "memberships",
    canActivate: [AuthorizedGuard],
    loadChildren: () => import("../membership-managment/membership-management.module").then((m) => m.MemberShipManagementModule)
  },
  {
    path: "requests",
    canActivate: [AuthorizedGuard],
    loadChildren: () => import("../requests/requests.module").then((m) => m.RequestsModule)
  },
  {
    path: 'leads',
    canActivate: [AuthorizedGuard,DICGuard],
    loadChildren: () =>
      import('../lead-management/lead-management.module').then(
        (m) => m.LeadManagementModule
      ),
  },
  {
    path: 'opportunities',
    canActivate: [AuthorizedGuard,DICGuard],
    loadChildren: () =>
      import('../opportunity-managment/opportunity-management.module').then(
        (m) => m.OpportunityManagementModule
      ),
  },
  {
    path: 'companys',
    canActivate: [AuthorizedGuard],
    loadChildren: () =>
      import('../company-managment/company-management.module').then(
        (m) => m.CompanyManagementModule
      ),
  },
  {path:'wallets',
  canActivate: [AuthorizedGuard,DCCGuard],
  loadChildren:() =>
    import('../wallet-managment/wallet.module').then(
      (m)=>m.WalletModule
    )
  },
  {path:'documents',
  canActivate: [AuthorizedGuard,DCCGuard],
  component:DocumentsPageComponent
  },
  {path:'payments',
  canActivate: [AuthorizedGuard,DCCGuard],
  component:PaymentListPageComponent
  },
  
  {
    path: 'coo',
    canActivate: [AuthorizedGuard],
    loadChildren: () =>
      import('../coo-management/coo-management.module').then(
        (m) => m.CooManagementModule
      ),
  },
  {
    path: 'cancle-membership',
    canActivate: [AuthorizedGuard],
    component:CancleMembershipPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesCatalogRoutingModule {}
