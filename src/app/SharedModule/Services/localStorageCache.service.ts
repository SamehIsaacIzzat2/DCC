import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageCacheService {

  constructor(private local: LocalStorageService) {}

  // get
  public get<T>(key: string) {
    let temp = this.local.get(key);
    if (temp)
        return temp as T;
    return null;
  }

  // set
  public set<T>(key: string, value: T) {
    this.local.set(key, value);
  }

  // remove
  public remove(key: string) {
    this.local.remove(key);
  }

}
