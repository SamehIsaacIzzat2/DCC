import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { DashboardWidgetListModel } from './dashboardWidgetList.model';

@Component({
  selector: 'dashboard-widgetList',
  templateUrl: 'dashboardWidgetList.component.html',
  styleUrls: ['dashboardWidgetList.component.scss'],
  providers: [DashboardWidgetListModel]
})

export class DashboardWidgetListComponent {

  constructor(public model: DashboardWidgetListModel, private authService: AuthenticationService) { }

  ngAfterViewInit(): void {
    if(this.authService.isCallCenter() || this.authService.isOperationManager()) 
      this.model.loadCallCenterCounts();
  }

}
