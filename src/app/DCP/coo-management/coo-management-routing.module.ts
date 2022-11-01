import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooRequestInformationDetailsComponent } from './components/coo-request-information-details/coo-request-information-details.component';
import { CooRequestResultActionsDetailsComponent } from './components/coo-request-result-actions-details/coo-request-result-actions-details.component';
import { CooDetailsComponent } from './pages/coo-details-page/coo-details.component';
import { CooRequestResultComponent } from './pages/coo-request-result/coo-request-result.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new-coo',
  },
  {
    path: 'new-coo',
    loadChildren: () =>
      import('./pages/new-coo/new-coo.module').then((m) => m.NewCooModule),
  },
  {
    path:'request-result',
    component:CooRequestResultComponent
  },
  {
    path:'request-details',
    component:CooDetailsComponent,
    children:[
     { path:'' ,redirectTo:'requestInfo'},
     { path:'requestInfo' ,component:CooRequestInformationDetailsComponent},
     { path:'request-result-actions' ,component:CooRequestResultActionsDetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CooManagementRoutingModule {}
