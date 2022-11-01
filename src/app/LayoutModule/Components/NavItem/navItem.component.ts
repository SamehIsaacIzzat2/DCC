import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INavItem } from './iINavItem';
import { NavItemModel } from './navItem.model';

@Component({
  selector: 'navItem',
  templateUrl: './navItem.component.html',
  styleUrls: ['./navItem.component.scss'],
  providers: [NavItemModel]
})

export class NavItemComponent {

  @Input() public set item(item: INavItem) {
    if(item)
      this.model.item = item;
  }
  @Output() public onClick: EventEmitter<INavItem> = new EventEmitter<INavItem>();

  constructor(public model: NavItemModel) { 
    this.model.onClick.subscribe( (item) => this.onClick.emit(item) );
  }

}
