import { Injectable, EventEmitter } from '@angular/core';
import { IPerson } from './iPerson';

@Injectable()
export class PersonItemModel {

  //====================Events =====================
  public onClick: EventEmitter<IPerson> = new EventEmitter<IPerson>();

  // ===================== Data ====================
  public data: IPerson = {} as IPerson;
  public highlightedText: string;

  constructor() { }

  // Name
  public get Name() {

    // let matches: RegExpMatchArray = [];
    let matches: any;
    if (this.data.name)
      matches = this.data.name.match(/\b(\w)/g) || this.data.name.match(/./u);

    if (matches)
      return matches.join('').slice(0, 2);
    return null;
  }

  // Click
  public clickItem() {
    this.onClick.emit(this.data);
  }

}
