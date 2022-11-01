import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnAuthorizedGuard } from '../CallerModule/RoutingGuards/unAuthorized.guard';
import { CreatePasswordComponent } from './Components/create-password/create-password.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterFormComponent } from './Components/RegisterForm/registerForm.component';
import { CompleteRegistrationCreatePasswordComponent } from './pages/complete-registration-create-password/complete-registration-create-password.component';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { RegistrationLayoutComponent } from './pages/registration-layout/registration-layout.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const identityRoutes: Routes = [
  { path: 'register', component: RegistrationLayoutComponent, canActivate: [UnAuthorizedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthorizedGuard] },
  {path:'redirect',component:RedirectPageComponent, canActivate: [UnAuthorizedGuard]},
  {path:'verification',component:RegistrationLayoutComponent , canActivate: [UnAuthorizedGuard] },
  {path:'completeRegistration', component:CompleteRegistrationComponent,canActivate: [UnAuthorizedGuard]},
  {path:'createPassword', component:CompleteRegistrationCreatePasswordComponent,canActivate: [UnAuthorizedGuard]},
  {path:'forgetPassword',component:ForgetPasswordComponent,canActivate: [UnAuthorizedGuard]},
  {path:'resetPassword',component:ResetPasswordComponent,canActivate: [UnAuthorizedGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(identityRoutes)
  ],
  exports: [RouterModule]
})

export class IdentityRoutingModule { }
