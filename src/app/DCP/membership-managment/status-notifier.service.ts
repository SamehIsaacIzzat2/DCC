import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusNotifierService {

  //==================================Data================================
  
  public statusNotifier=new BehaviorSubject<number>(0);
  public requestId=new BehaviorSubject<any>('');


  constructor() { }
}
