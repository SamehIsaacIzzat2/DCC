import { SocialInfo } from './../../interfaces/interfaces';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { editCompState } from '../../Enums/edit-components.enum';
import { EditSocialInformation } from './edit-social-information';

@Component({
  selector: 'app-edit-social-information',
  templateUrl: './edit-social-information.component.html',
  styleUrls: ['./edit-social-information.component.scss'],
  providers:[EditSocialInformation]
})
export class EditSocialInformationComponent implements OnInit {

 //=======================Data===========================================
  @Input() State: editCompState = 1;
  @Output() sendSubmittedSocailData: EventEmitter<SocialInfo | null> = new EventEmitter();
  constructor(
    public model:EditSocialInformation
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //setting state for component
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedSocailData
  }

  public getEditState(): boolean {
    return this.State === editCompState.EditSectionState
  }
  public getSteeperState(): boolean {
    return this.State === editCompState.SteeperStatte
  }


}
