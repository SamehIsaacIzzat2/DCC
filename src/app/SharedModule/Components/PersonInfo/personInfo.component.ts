import { Component, Input } from '@angular/core';
import { PersonInfoModel } from './personInfo.model';
import { IPersonInfo } from './iPersonInfo';

@Component({
  selector: 'person-info',
  templateUrl: 'personInfo.component.html',
  styleUrls: ['personInfo.component.scss'],
  providers: [PersonInfoModel]
})

export class PersonInfoComponent {

  @Input() public set data(data: IPersonInfo) {
    this.model.data = data;
  }

  constructor(public model: PersonInfoModel) { }

}
