import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, map, Observable } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { RequestMethod } from '../Enums/enums';
import { Result } from './Result';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ConfigService } from './config-service.service';
import { PlatformService } from '../../SharedModule/Services/platform.service';

@Injectable({
  providedIn: 'root',
})
export class APICallerService {
  //==========================Data=======================
  public imageServerPath: string = '';
  private serviceApiUrl: string;
  public onUnAuthorized: EventEmitter<void> = new EventEmitter<void>();



  //=================================================Client Host============================================================
  public domain =this.configSer.config.WEBURL +'/';
  public domainName = this.configSer.config.APIURL;
  //  public domainName ="https://dccdspapi.azurewebsites.net/api/dcc";



  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private snackService: SnackService,
    private authService: AuthenticationService,
    private router: Router,
    private configSer:ConfigService,
    private platformSer:PlatformService
  ) {
    this.imageServerPath = this.domainName;
    this.serviceApiUrl = this.domainName + '/api/dcc/';
  }

  public isTokenExpired() {
    // catch token
    let token = this.tokenService.AccessToken ? this.tokenService.AccessToken :null;
    // catch current date
    let currentDate = new Date().getTime();
    // try to decode token
    if (token) {
      let decoded: any = jwt_decode(token!);
      // console.log("decoded", currentDate)
      let tokenExpirDate = decoded.exp * 1000;
      // console.log("token date", decoded)
      if (tokenExpirDate < currentDate) {
        this.authService.signOut();
      }
    }
  }

  public getHeaders(contentType: string = 'application/json') {
    this.isTokenExpired();
    let token = this.tokenService.AccessToken;
    if (token)
      return new HttpHeaders({
        'Content-Type': contentType,
        'Accept-Language': localStorage.getItem('lang') || 'en',
        Authorization: 'Bearer ' + token,
        'platform':this.platformSer.getPlatform()
      });
    else
      return new HttpHeaders({
        'Content-Type': contentType,
        'Accept-Language': localStorage.getItem('lang') || 'en',
        'platform':this.platformSer.getPlatform()
      });

  }

  private serverRequest(
    method: RequestMethod,
    url: string,
    body: any,
    handleloader: boolean = true,
    auth: boolean = true,
    handleError: boolean = true
  ): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl + url;

    let requestOptions = {
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    };

    if (handleloader) this.showLoader();

    // call service
    var response = this.http.request(
      RequestMethod[method],
      fUrl,
      requestOptions
    );
    return response
      .pipe(
        catchError((response) => {
          // debugger
          if (response.status == 200) {
            let res: Result<any> = new Result<any>();
            res.isError = false;
            res.result = response.error.text;
            res.handledResponse = true;

            return from([res]);
          }
          return this.handleError(response, handleError);
        })
      )
      .pipe(
        map((response: any) => {
          // debugger
          if (handleloader) this.hideLoader();
          if (response) {
            if (response.handledResponse) return response;
          }

          let res: Result<any> = new Result<any>();
          res.isError = false;
          res.result = response;
          return res;
        })
      );
  }

  public post(
    url: string,
    body: any,
    loader: boolean = true,
    auth: boolean = true,

    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(
      RequestMethod.POST,
      url,
      body,
      loader,
      auth,
      handleError
    );
  }

  public put(
    url: string,
    body: any,
    auth: boolean = true,
    loader: boolean = true,
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(
      RequestMethod.PUT,
      url,
      body,
      loader,
      auth,
      handleError
    );
  }

  public delete(
    url: string,
    body: any,
    auth: boolean = true,
    loader: boolean = true,
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(
      RequestMethod.DELETE,
      url,
      body,
      loader,
      auth,
      handleError
    );
  }

  public get(
    url: string,
    loader: boolean = true,
    auth: boolean = true,
    handleError: boolean = true
  ): Observable<Result<any>> {
    return this.serverRequest(
      RequestMethod.GET,
      url,
      null,
      loader,
      auth,
      handleError
    );
  }

  public call(
    method: RequestMethod,
    url: string,
    body: any,
    authToken: string
  ): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl + url;

    let requestOptions = {
      body: JSON.stringify(body),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
    };

    this.showLoader();
    // call service
    var response = this.http.request(
      RequestMethod[method],
      fUrl,
      requestOptions
    );
    return response
      .pipe(catchError((error) => this.handleError(error, true)))
      .pipe(
        map((response: any) => {
          this.hideLoader();
          if (!response.isError) {
            let res: Result<any> = new Result<any>();
            res.isError = false;
            res.result = response;
            // res.result = response.result;
            return res;
          }
          return response;
        })
      );
  }

  public getUserRoles(token: any): Observable<Result<any>> {
    let fUrl = this.serviceApiUrl; //+ APIs.Roles.UserRoles;

    let requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    // call service
    var response = this.http.request('Get', fUrl, requestOptions);
    return response
      .pipe(catchError((error) => this.handleError(error, true)))
      .pipe(
        map((response: any) => {
          // if (loader)
          //     this.loaderService.outLoad(loader);
          if (!response.isError) {
            let res: Result<any> = new Result<any>();
            res.isError = false;
            res.result = response;
            // res.result = response.result;
            return res;
          }
          return response;
        })
      );
  }

  // Handle Error
  private handleError(response: any, viewError: any) {
    this.hideLoader();
    if (viewError) {
      if (response && response.error.error) {
        if (response.error.error.message) {
          this.snackService.snack(response.error.error.message);
        } else {
          // debugger;
          if (response.status == 401) {
            // this.snackService.snack('Please relogin again');
            this.onUnAuthorized.emit();
            this.authService.signOut();
          } else if (response.status == 500)
            this.snackService.snack('Internal Server Error');
          else if (response.status == 422)
            this.snackService.snack('Validation error');
          else if (response.status == 406)
            this.snackService.snack('Business error');
          else if (response.status == 404)
            this.snackService.snack('Entity Not Found');
          else this.snackService.snack(response.error.error.message);
        }
      } else if (response.status == 401) {
        // this.snackService.snack('Please relogin again');
        this.onUnAuthorized.emit();
        this.authService.signOut();
      }
    }

    let res: Result<string> = new Result<string>();
    res.isError = true;
    res.result = response.Message;
    res.handledResponse = true;
    return from([res]);
  }

  // Handle Refresh Token
  private handleRefreshToken() {
    // let model = {
    // accessToken: this.tokenService.AccessToken,
    // refreshToken: this.tokenService.RefreshToken
    // }
    // this.post(APIs.Account.RefreshToken, model).subscribe(res => {
    // if (!res.isError)
    //     this.tokenService.authenticate(res.result);
    // });
  }

  // Show Loader
  public showLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'flex';
  }

  // Hide Loader
  public hideLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'none';
  }
}
