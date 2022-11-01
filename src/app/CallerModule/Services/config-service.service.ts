import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http
      .get<any>('./assets/config.json')
      .subscribe(config => {
        this.config = config;
        console.log(this.config);
      });
  }
}

