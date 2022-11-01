import { ContactInfo } from './../../interfaces/interfaces';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { editCompState } from '../../Enums/edit-components.enum';
import { EditContactInformationModel } from './edit-contact-information-model';

@Component({
  selector: 'app-edit-contact-information',
  templateUrl: './edit-contact-information.component.html',
  styleUrls: ['./edit-contact-information.component.scss'],
  providers:[EditContactInformationModel]
})
export class EditContactInformationComponent implements OnInit {
  @Input() State: editCompState = 1;
  @Output() sendSubmittedContactData: EventEmitter<ContactInfo | null> = new EventEmitter();
  constructor(public model:EditContactInformationModel) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //setting state for component
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedContactData
  }


  public getEditState(): boolean {
    return this.State === editCompState.EditSectionState
  }
  public getSteeperState(): boolean {
    return this.State === editCompState.SteeperStatte
  }

}
