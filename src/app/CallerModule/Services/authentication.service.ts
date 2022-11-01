import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { LocalStorageCacheService } from 'src/app/SharedModule/Services/localStorageCache.service';
import { TokenService } from './token.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { Result } from './Result';
import { UserProfile } from 'src/app/profile/interfaces/interfaces';
import { ConfigService } from './config-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //=============================Data===============================
  public user: BehaviorSubject<any> = new BehaviorSubject(null);
  public userProfileData$: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);
  public userProfileEditedData$: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);
  public isAuthenticated = new BehaviorSubject(false);
  private USER_KEY: string = 'token';

  //=============================Events===============================
  //public onLogout: EventEmitter<void> = new EventEmitter<void>();
  public onAuth: EventEmitter<void> = new EventEmitter<void>();

  //===========================Constructor=============================
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private local: LocalStorageCacheService,
    private _Http: HttpClient,
    private configSer:ConfigService,
    private snakSer: SnackService
  ) {
    // this.tokenService.onAuthorized.subscribe((accessToken) => {
    //   this.setUser(accessToken);
    // });
  }

  //==============================Logic================================

  // Set User
  public setUser(token: string, user: any) {
    if (token && user) {
      this.user.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(this.USER_KEY, token);
      this.isAuthenticated.next(true);
    }
  }

  public getRefreshToken() {
    let token = localStorage.getItem('refreshToken');
    if (token) {
      // //  for QA
      // let url="https://dccdspapi.azurewebsites.net/api/dcc/";

      // for devolpment
      let url = this.configSer.config.APIURL+'/api/dcc/';

      this._Http
        .post(
          url + APIs.Account.refreshToken,
          {
            refreshToken: token,
          },
          {
            headers: new HttpHeaders({
              Authorization: `Bearer ${this.tokenService.AccessToken}`,
            }),
          }
        )
        .pipe(take(1))
        .subscribe((res: any) => {
          this.setUser(res.token.accessToken, res.user);
        });
    } else {
      return;
    }
  }
  // Check if is Authorized
  public isAuthorized() {
    return this.tokenService.HasToken;
  }

  // sign-out from UAE-pass
  public uaePassLogout() {
    // Api devolpment
    let url = this.configSer.config.APIURL +'/api/dcc/';
    let redirectUrl = this.configSer.config.WEBURL  +'/identity/login';

    //Api QC
    // let url="https://dccdspapi.azurewebsites.net/api/dcc/";
    // let redirectUrl ='https://dccdspweb.azurewebsites.net/identity/login';

    this._Http
      .get(url + APIs.Account.UAEPassLogout + `?redirectUri=${redirectUrl}`)
      .subscribe((res: any) => {
        if (res.url) {
          window.location.href = res.url;
        } else {
          // this.router.navigate(['/identity/login']);
        }
        this.user.next(null);
        this.isAuthenticated.next(false);

        // }else{
        //   this.snakSer.snack("Unknown Error");

        // }
      });
  }

  // Sign Out
  public signOut() {
    localStorage.removeItem(this.USER_KEY);
    this.tokenService.clearToken();
    this.tokenService.clearUser();

    // sign out from UAE-pass
    this.uaePassLogout();
  }

  // IS Call Center
  // public isCallCenter() {
  //   // console.log("this.getCurrentUser().role ", this.getCurrentUser().role)
  //   if (this.getCurrentUser().role)
  //     return this.getCurrentUser().role.toLowerCase() == 'callcenter';
  // }

  // // IS Admin
  // public isAdmin() {
  //   return this.getCurrentUser().role.toLowerCase() == 'admin';
  // }

  // // Is ERP
  // public isERPUser() {
  //   return this.getCurrentUser().role.toLowerCase() == 'erp';
  // }

  // // Is Operation Manager
  // public isOperationManager() {
  //   return this.getCurrentUser().role.toLowerCase() == 'operationmanager';
  // }

  // // Is Marketing employee
  // public isMarketingEmployee() {
  //   return this.getCurrentUser().role.toLowerCase() == 'marketingteam';
  // }

  // // Is Donation Supervisor
  // public isDonationSupervisor() {
  //   return this.getCurrentUser().role.toLowerCase() == 'donationsupervisor';
  // }
}
