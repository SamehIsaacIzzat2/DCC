import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(
    private authHelper: AuthenticationService,
    private router: Router,
    private snakSer: SnackService
  ) {}

  //=======Services ==============
  canActivate() {
    if (!this.authHelper.isAuthorized()) {
      this.snakSer.snack('Please login to access this page!');
      this.router.navigateByUrl('/dcc/identity/login');
    }
    return this.authHelper.isAuthorized();
  }
}
