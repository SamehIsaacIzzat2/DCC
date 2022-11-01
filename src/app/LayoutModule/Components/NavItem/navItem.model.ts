import { EventEmitter, Injectable } from "@angular/core";
import { INavItem } from "./iINavItem";

@Injectable()
export class NavItemModel {

    //=========================Data=====================
    public item: INavItem = {} as INavItem;

    //===================Constructor====================
    constructor() {}

    //=======================Events=====================
    public onClick: EventEmitter<INavItem> = new EventEmitter<INavItem>();
    
    //========================Logic=====================

    // Click on Item
    public click(item: INavItem) {
        this.onClick.emit(item);
    }

}