import { Component } from '@angular/core';
import { NavItemsModel } from './navItems.model';

@Component({
  selector: 'navItems',
  templateUrl: './navItems.component.html',
  styleUrls: ['./navItems.component.scss'],
  providers: [NavItemsModel]
})

export class NavItemsComponent {

  constructor(public model: NavItemsModel) { }

}
