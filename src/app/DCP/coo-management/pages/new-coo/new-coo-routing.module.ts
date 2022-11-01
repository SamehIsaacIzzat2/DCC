import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCooPageComponent } from './new-coo-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCooRoutingModule {}
