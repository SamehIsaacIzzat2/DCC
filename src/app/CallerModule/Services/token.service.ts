import { EventEmitter, Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "angular-web-storage";

@Injectable({
    providedIn: 'root'
})

export class TokenService {

    //=======================Data=========================
    private TOKEN_NAME = "tokenKey";
    private USER = "userKey";
    private jwtService: JwtHelperService;

    //=======================Events=========================
    public onAuthorized: EventEmitter<any> = new EventEmitter<any>();

    //=====================Constructor======================
    constructor(private local: LocalStorageService) {
        this.jwtService = new JwtHelperService();
    }

    //=======================Logic=========================

    // Authenticate
    public authenticate(token: any) {
        var decodedToken = this.jwtService.decodeToken(token);
        this.local.set(this.TOKEN_NAME, token);
        this.local.set(this.USER, decodedToken);
        this.onAuthorized.emit(decodedToken);
    }

    // Authorize User
    public authorizeUser() {
        let token = this.DecodedToken;
        if (token)
            this.onAuthorized.emit(token);
    }

    // Get Decoded Token
    public get DecodedToken() {
        let token = this.local.get(this.TOKEN_NAME);

        if (token)
            return this.jwtService.decodeToken(token);

        return null;
    }

    // Get Access Token
    public get AccessToken() {
        let temp = localStorage.getItem("token");
      if (temp) return temp;
      return null;

    }

    // Check if has token
    public get HasToken(): boolean {
        let temp = this.AccessToken;
        return temp != null && temp != undefined;
    }

    // Clear Token
    public clearToken() {
        this.local.remove(this.TOKEN_NAME);
    }

    // Clear User
    public clearUser() {
        this.local.remove(this.USER);
    }

}
