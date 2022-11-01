import { compAddressInfo } from './../../interfaces/company.interface';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { EditContactCompanyInformationModel } from './edit-contact-info.model';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.scss'],
  providers: [EditContactCompanyInformationModel]
})
export class EditContactInfoComponent implements OnInit,OnChanges {
  @Input() State: editCompState = 1;
  @Output() sendSubmittedContactData: EventEmitter<compAddressInfo | null> =
    new EventEmitter();
  constructor(public model: EditContactCompanyInformationModel) { }
  ngOnInit(): void {
    this.model.getSelectData();
  }

  displayWith(obj?: any): string {
    return obj ? obj.name : '';
  }

  public getEditState(): boolean {
    return this.State === editCompState.EditSectionState;
  }
  public getSteeperState(): boolean {
    return this.State === editCompState.SteeperStatte;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //setting state for component
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedContactData;
  }


}
