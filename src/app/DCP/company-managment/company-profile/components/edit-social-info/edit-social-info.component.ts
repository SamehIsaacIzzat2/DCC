import { compSocialInfo } from './../../interfaces/company.interface';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { EditSocailCompanyInformationModel } from './edit-socail-info.model';

@Component({
  selector: 'app-edit-social-info',
  templateUrl: './edit-social-info.component.html',
  styleUrls: ['./edit-social-info.component.scss'],
  providers: [EditSocailCompanyInformationModel]
})
export class EditSocialInfoComponent implements OnInit, OnChanges {
  //DATA
  public filteredOptions: Observable<any[] | null>;
  @Input() State: editCompState = 1;
  @Output() sendSubmittedSocailData: EventEmitter<compSocialInfo | null> =
    new EventEmitter();
  // Constructor
  constructor(public model: EditSocailCompanyInformationModel) { }
  ngOnInit(): void {
    // this.filteredOptions = this.model.socialInformationForm.controls[
    //   'nationalityId'
    // ].valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(this.model.nationalities, value || ''))
    // );
    this.model.getSelectData();

  }
  // private _filter(arr: any[], value: string): string[] | null {
  //   if (arr && arr.length > 0) {
  //     const filterValue = value.toString().toLowerCase();
  //     return arr.filter((option) =>
  //       option.name.toLowerCase().includes(filterValue)
  //     );
  //   }
  //   return null;
  // }

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
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedSocailData;
  }

}
