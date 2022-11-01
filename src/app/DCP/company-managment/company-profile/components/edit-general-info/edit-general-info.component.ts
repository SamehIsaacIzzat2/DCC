import { compGeneralInfo } from './../../interfaces/company.interface';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { EditGeneralCompanyInformationModel } from './edit-generl-info.model';

@Component({
  selector: 'app-edit-general-info',
  templateUrl: './edit-general-info.component.html',
  styleUrls: ['./edit-general-info.component.scss'],
  providers: [EditGeneralCompanyInformationModel]
})
export class EditGeneralInfoComponent implements OnInit,OnChanges {
  @Output() sendSubmittedGeneralData: EventEmitter<compGeneralInfo | null> =
    new EventEmitter();
  @Input() State: editCompState = 1;
  constructor(public model: EditGeneralCompanyInformationModel) { }

  ngOnInit(): void {
    this.model.setFilteration();
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
    this.model.sendEvent = this.sendSubmittedGeneralData;
  }

}
