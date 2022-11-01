import { Component } from '@angular/core';
import { DashboardModel } from './dashboard.model';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers: [DashboardModel]
})

export class DashboardComponent {

  constructor(public model: DashboardModel) { }

}
