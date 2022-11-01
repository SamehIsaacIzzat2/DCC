import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddNewConsigneeComponent } from '../add-new-consignee/add-new-consignee.component';
import { ConsigneeModel } from './consignee.model';

@Component({
  selector: 'consignee-info',
  templateUrl: './consignee-info.component.html',
  styleUrls: ['./consignee-info.component.scss'],
  providers: [ConsigneeModel],
})
export class ConsigneeInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(AddNewConsigneeComponent)
  addNewConsigneeComponent: AddNewConsigneeComponent;
  constructor(public model: ConsigneeModel) {}

  ngOnInit(): void {
    console.log('mode', this.model);
  }

  ngAfterViewInit(): void {
    this.model.AddNewConsigneeComponent = this.addNewConsigneeComponent;
  }

  public onAddNewConsigneeClick() {
    this.model.AddNewConsigneeComponent = this.addNewConsigneeComponent;
    this.model.showAddConsigneeForm();
  }
}
