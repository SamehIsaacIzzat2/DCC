import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  public platform = 'dcc';
  constructor(private router: Router) { }
  // Get Platform is DCC or DIC
  public getPlatform(){
    return this.router.url.includes('dcc')?'dcc':'dic';
  }

  public getPlatformAsync(){
    return this.router.events;
  }
  
}
