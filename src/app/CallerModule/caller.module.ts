import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../AngularMaterialModule/angularMaterialModule.module';
import { AuthorizedGuard } from './RoutingGuards/authorized.guard';
import { UnAuthorizedGuard } from './RoutingGuards/unAuthorized.guard';
import { DCCGuard } from './RoutingGuards/dcc.guard';
import { DICGuard } from './RoutingGuards/dic.guard';

@NgModule({
  imports: [
    RouterModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [],
  providers: [
    AuthorizedGuard, UnAuthorizedGuard,DCCGuard,DICGuard
  ]
})

export class CallerModule { }
