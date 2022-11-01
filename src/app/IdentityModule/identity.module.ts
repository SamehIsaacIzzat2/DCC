import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../AngularMaterialModule/angularMaterialModule.module";
import { SharedModule } from "../SharedModule/shared.module";
import { IdentityRoutingModule } from "./identity-routing.module";
import { LoginComponent } from "./Components/Login/login.component";
import { RegisterFormComponent } from "./Components/RegisterForm/registerForm.component";
import { RegistrationLayoutComponent } from './pages/registration-layout/registration-layout.component';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';
import { SetOTPComponent } from './Components/set-otp/set-otp.component';
import { CreatePasswordComponent } from './Components/create-password/create-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { RecaptchaModule } from "ng-recaptcha";
import { CompleteRegistrationCreatePasswordComponent } from './pages/complete-registration-create-password/complete-registration-create-password.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      AngularMaterialModule,
      SharedModule,
      IdentityRoutingModule,
      RecaptchaModule,
      InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
      TranslateModule
    ],
    declarations: [
      RegisterFormComponent,
      LoginComponent,
      RegistrationLayoutComponent,
      CompleteRegistrationComponent,
      SetOTPComponent,
      CreatePasswordComponent,
      ForgetPasswordComponent,
      ResetPasswordComponent,
      RedirectPageComponent,
      CompleteRegistrationCreatePasswordComponent,
    ],
    exports: [
      RegisterFormComponent,
      LoginComponent
    ],
    providers: [ ]
  })

  export class IdentityModule {}