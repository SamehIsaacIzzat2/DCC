import { ProfileCompletedSuccessComponent } from './components/profile-completed-success/profile-completed-success.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfilePageComponent } from './page/complete-profile-page/complete-profile-page.component';

const routes: Routes = [
  {path:"",component:CompleteProfilePageComponent},
  {path:"success",component:ProfileCompletedSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteProfileRoutingModule { }
