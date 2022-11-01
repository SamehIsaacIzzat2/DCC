import { RequestDetailsPageComponent } from './page/request-details-page/request-details-page.component';
import { CreateRequestPageComponent } from './page/create-request-page/create-request-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { DetailsComponent } from './components/details/details.component';
import { RequestDirectoryComponent } from './components/request-directory/request-directory.component';
import { RequestFinalDetailsComponent } from './components/request-final-details/request-final-details.component';
import { RequestResultComponent } from './components/request-result/request-result.component';
import { RequestActionsComponent } from './components/request-actions/request-actions.component';
import { CompanyInfoComponent } from 'src/app/SharedModule/Components/company-info/company-info.component';

const routes: Routes = [
  { path: '', component: RequestDirectoryComponent },
  { path: 'createRequest', component: CreateRequestPageComponent },
  { path: 'createRequest/:id', component: CreateRequestPageComponent },

  { path: 'requestResult/:id', component: RequestResultComponent },
  { path: "requestDetails/:id", component: RequestDetailsPageComponent },

  { path: ':requestId/companyInfo/:companyId', component: CompanyInfoComponent },
  // { path:"requestDetails",component:RequestFinalDetailsComponent},
  // { path:"requestResult/:id",component:RequestResultComponent},
  {
    path: "services",
    loadChildren: () => import("../services-catalog/services-catalog.module").then((m) => m.ServicesCatalogModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
