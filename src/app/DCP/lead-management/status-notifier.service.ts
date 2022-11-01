import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusNotifierService {

  //***************************************************Data****************************************** */
  public changeStatusListener=new Subject();

  constructor() { }

}
