import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventActionModel } from './EventAction.model';

@Injectable({
  providedIn: 'root'
})
export class EventActionServiceService {
  eventAction:EventActionModel; 

  constructor() { }
}
