import { compCommunicationSettinggs } from './../../interfaces/company.interface';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { EditCommunicationCompanyInformationModel } from './edit-communication-setting.model';

@Component({
  selector: 'app-edit-communication-setting',
  templateUrl: './edit-communication-setting.component.html',
  styleUrls: ['./edit-communication-setting.component.scss'],
  providers: [EditCommunicationCompanyInformationModel]
})
export class EditCommunicationSettingComponent implements OnInit, OnChanges {
  @Input() State: editCompState = 1;
  @Output() sendSubmittedContactData: EventEmitter<compCommunicationSettinggs | null> =
    new EventEmitter();
  constructor(public model: EditCommunicationCompanyInformationModel) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedContactData;
  }

  ngOnInit(): void {
  }

  public getEditState(): boolean {
    return this.State === editCompState.EditSectionState;
  }
  public getSteeperState(): boolean {
    return this.State === editCompState.SteeperStatte;
  }

}
