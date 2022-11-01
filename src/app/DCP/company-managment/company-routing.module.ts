import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComapnysPageComponent } from './pages/list-comapnys-page/list-comapnys-page.component';

const routes: Routes = [
  { path: '', component: ListComapnysPageComponent },
  {
    path: 'add-company',
    loadChildren: () =>
      import('./add-company/add-company.module').then(
        (m) => m.AddCompanyModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        (m) => m.CompanyProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
