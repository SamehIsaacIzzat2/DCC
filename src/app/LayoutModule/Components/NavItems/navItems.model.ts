import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Injectable } from '@angular/core';
import { INavItem } from '../NavItem/iINavItem';

@Injectable()
export class NavItemsModel {
  //======================Data=======================
  public items: Array<INavItem> = new Array<INavItem>();

  //===================Constructor====================
  constructor(private authService: AuthenticationService) {
  }

  //======================Logic=======================
}
