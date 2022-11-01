import { Subject, takeUntil } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';

@Injectable()
export class CreateInteractionModel {
  //********************************Data************************************** */
  public interactionTypeList: any[] = [];
  public interactionForm: FormGroup;
  public requiredFlag: boolean = false;
  public fieldShowFlag: boolean = false;
  public submitted: boolean = false;
  public endSub$ = new Subject();
  public CreateInteraction: EventEmitter<any> = new EventEmitter<any>();
  public leadId: string = '';
  public today: string = '';
    public defaultDate: any = null;

  constructor(
    private formbuilder: FormBuilder,
    private _LookupService: LookupService,
    private apiser: APICallerService,
    private route: ActivatedRoute
  ) {
    this.initForm();
    this.getLookupData();
    this.setDataMinValue();

    this.route.params.subscribe((prameters) => {
      this.leadId = prameters.leadId;
    });
  }
  //********************************Logic************************************** */
  get f(): { [key: string]: AbstractControl } {
    return this.interactionForm.controls;
  }

  setDataMinValue() {
    this.today =
      new Date(Date.now()).toLocaleDateString().split('/').reverse().join('-') +
      'T' +
      new Date(Date.now()
      ).toLocaleTimeString().slice(0, 5);
  }

  initForm() {
    this.interactionForm = this.formbuilder.group({
      interactionType: ['', [Validators.required]],
      specifyInteractionType: [''],
      description: ['', [Validators.required]],
      dateTime: ['', Validators.required],
    });
  }

  getLookupData() {
    this._LookupService.getInteractionsType().subscribe((res) => {
      console.log(res);
      this.interactionTypeList = res;
    });
  }

  ModifyRequiredFlag(data: any) {
    if (data.value.trim() != '') {
      this.requiredFlag = false;
    } else {
      this.requiredFlag = true;
    }
  }

  setDataFunc() {
    let typeOther: any = {};

    let interactionType = this.interactionForm.get('interactionType')?.value;

    this.interactionTypeList.forEach((interaction) => {
      if (interaction.name.toLowerCase() === 'Other'.toLowerCase()) {
        typeOther = interaction;
      }
    });
    const formController = this.f['specifyInteractionType'];
    if (interactionType == typeOther.id) {
      this.requiredFlag = true;
      this.fieldShowFlag = true;

      formController.addValidators(Validators.required);
      formController.updateValueAndValidity()
    } else {
      this.requiredFlag = false;
      this.fieldShowFlag = false;
      formController.removeValidators(Validators.required);
      formController.updateValueAndValidity()
    }
  }

  createNewInteraction() {
    console.log(this.interactionForm)
    this.submitted = true;
    if (this.interactionForm.invalid) return;

    let submittedData = {
      interactionType: this.interactionForm.get('interactionType')?.value,
      specifyInteractionType: this.interactionForm.get('specifyInteractionType')
        ?.value,
        propseDateTime:new Date( this.interactionForm.get('dateTime')?.value).toISOString(),
      description: this.interactionForm.get('description')?.value,
    };
    this.apiser
      .post(APIs.leads.createInteraction + `/${this.leadId}`, submittedData)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        if (!res.isError) {
          if (res.result.isSucceded) {
            this.CreateInteraction.emit('');
          }
        }
      });

    console.log(this.interactionForm, '', submittedData);
  }

  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
