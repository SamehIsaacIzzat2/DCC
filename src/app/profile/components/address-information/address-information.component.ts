import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { viewCompState } from '../../Enums/edit-components.enum';
import { AddressInformationModel } from './address-information-model';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.scss'],
  providers:[AddressInformationModel]
})
export class AddressInformationComponent implements OnInit,OnChanges {
//=========================Data=======================
  @Input() stateMode: viewCompState = 1;
constructor(public model:AddressInformationModel) {
}


  ngOnInit(): void {
    this.model.getCurrentProfile();
  }

  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.model.stateMode = this.stateMode
  }

}
