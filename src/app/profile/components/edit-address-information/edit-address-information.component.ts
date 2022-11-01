import { AddressInfo } from './../../interfaces/interfaces';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { editCompState } from '../../Enums/edit-components.enum';
import { EditAddressInformatiomModel } from './edit-address-informatiom-model';

@Component({
  selector: 'app-edit-address-information',
  templateUrl: './edit-address-information.component.html',
  styleUrls: ['./edit-address-information.component.scss'],
  providers:[EditAddressInformatiomModel]
})
export class EditAddressInformationComponent implements OnInit {
  @Input() State: editCompState = 1;
  @Output() sendSubmittedAdressData: EventEmitter<AddressInfo | null> = new EventEmitter();
  constructor(public model:EditAddressInformatiomModel) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //setting state for component
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedAdressData
  }

  public getEditState():boolean{
    return this.State === editCompState.EditSectionState
  }
  public getSteeperState():boolean{
    return this.State === editCompState.SteeperStatte
  }

}
