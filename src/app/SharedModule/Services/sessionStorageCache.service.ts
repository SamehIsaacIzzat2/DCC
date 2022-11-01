import { Injectable } from "@angular/core";
import { SessionStorageService } from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})

export class SessionStorageCacheService {

  constructor(private session: SessionStorageService) { }

  // get
  public get<T>(key: string) {
    let temp = this.session.get(key);
    if (temp)
      return temp as T;
    return null;
  }

  // set
  public set<T>(key: string, value: T) {
    this.session.set(key, value);
  }

  //set with expiry
  public setWithExpiry<T>(key: string, value: T, hours: any) {
    let now: Date = new Date();
    now.setHours(now.getHours() + hours)
    const expiryObj = {
      value: value,
      expiry: now.getTime(),
    }
    sessionStorage.setItem(key, JSON.stringify(expiryObj));
  }

  public getWithExpiry(key: string) {
    return sessionStorage.getItem(key)
  }

  // remove
  public remove(key: string) {
    this.session.remove(key);
  }

}
