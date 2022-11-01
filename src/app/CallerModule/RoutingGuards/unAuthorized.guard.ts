import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable()
export class UnAuthorizedGuard implements CanActivate {

    constructor(private authHelper: AuthenticationService) { }

    //=======Services ==============
    canActivate() {
        return !this.authHelper.isAuthorized();
    }
    
}