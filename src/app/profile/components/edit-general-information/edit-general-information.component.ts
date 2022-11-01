import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { EditGeneralInformationModel } from './edit-general-information-model';
import { editCompState } from '../../Enums/edit-components.enum';
import { GeneralInfo } from '../../interfaces/interfaces';
import { createMask } from '@ngneat/input-mask';
@Component({
  selector: 'app-edit-general-information',
  templateUrl: './edit-general-information.component.html',
  styleUrls: ['./edit-general-information.component.scss'],
  providers: [EditGeneralInformationModel],
})
export class EditGeneralInformationComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() State: editCompState = 1;
  @Output() sendSubmittedGeneralData: EventEmitter<GeneralInfo | null> =
    new EventEmitter();
  //====================Data======================
  public filteredOptions: Observable<any[] | null>;
  public form: FormGroup;
  public emiratesIdInputMask:any = createMask('999-9999-9999999-9');
  public Idval:any;
  constructor(
    public model: EditGeneralInformationModel,
    private fb: FormBuilder
  ) {
    console.log("hi")

    this.model.currentUser?.generalInfo?.emiratesID ?  this.Idval=this.model.currentUser?.generalInfo?.emiratesID:
    this.Idval='784';
  }

  ngOnInit(): void {
    this.filteredOptions = this.model.generalInformationForm.controls[
      'nationalityId'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.model.nationalities, value || ''))
    );
  }
  private _filter(arr: any[], value: string): string[] | null {
    if (arr && arr.length > 0) {
      const filterValue = value.toString().toLowerCase();
      return arr.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
    return null;
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

  visitFeild(data:any){
    if(data==''){
      this.Idval='784';
    }else{
      this.Idval=data;
    } 

  }
   // clear EmirateId Feild if user only touch it without enterning numbers

   checkFeildContent(data:any){
    if(data=="784"){
      this.Idval='';
    } 
  }
  ngOnChanges(changes: SimpleChanges): void {
    //setting state for component
    this.model.stateMode = this.State;
    this.model.sendEvent = this.sendSubmittedGeneralData;
  }

  ngOnDestroy(): void {
    this.model.endsubs();
  }
}
