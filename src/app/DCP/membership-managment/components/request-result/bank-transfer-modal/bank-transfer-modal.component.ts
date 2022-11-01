import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailsItem } from 'src/app/SharedModule/Components/generic-display-details/Interfaces';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { Subject, takeUntil } from 'rxjs';
import { validateIBAN } from 'ngx-iban-validator';
import {FileData} from '../../../../../SharedModule/Components/fileUpload/interface';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';

@Component({
  selector: 'bank-transfer-modal',
  templateUrl: './bank-transfer-modal.component.html',
  styleUrls: ['./bank-transfer-modal.component.scss'],
})
export class BankTransferModalComponent implements OnInit, OnChanges {
  public paymentForm: FormGroup;
  public submitted: boolean = false;
  @Input() requestId: any;
  public endSub$ = new Subject();
  public exporterDetails: DetailsItem[] = [
    {
      title: this.translateService.instant(
        'memberShipsModule.bankTransfere.bankName'
      ) as any,
      data: 'Bank Name',
    },

    {
      title: this.translateService.instant(
        'memberShipsModule.bankTransfere.IBAN'
      ) as any,
      data: 'FABUAE289792',
    },
  ];
  public attachments : any[] = [];

  constructor(
    private translateService: TranslateService,
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private _router: Router,
    private snackService: SnackService,
    private modalService:FormModalService
  ) {}

  ngOnInit(): void {
    this.build();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', this.requestId);
  }

  build() {
    this.paymentForm = this.fb.group({
      accountNumber: [null, Validators.required],
      bankName: [null, Validators.required],
      iBanNumber: [null, [Validators.required]],
      reciept: [null, Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.paymentForm.controls;
  }

  //on submit form
  onSubmit(dismissButtonId:string) {
    this.submitted = true;
    console.log(this.paymentForm);
    if (this.paymentForm.invalid) return;
    const DataToSend = {
      requestNumber: `${this.requestId}`,
      paymentMethod: 121290004,
      bankInfo: {
        ...this.paymentForm.value,
      },
    };
    console.log('DataToSend', DataToSend);
    this.apiSer.post(APIs.membership.bankTransfer, DataToSend)
       .pipe(takeUntil(this.endSub$))
       .subscribe({
        next: (res) => {
          if (!res.isError) {
            this.modalService.hide(dismissButtonId);
            this.snackService.snack(this.translateService.instant('shared.generalWord.submittedsuccessfully'));
            this._router.navigate(['/dcc/services/requests']);
          }
        },
        error: () => {
          this.snackService.snack(
            this.translateService.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }



  uploadedImgs(files:FileData[]) {
    this.paymentForm.controls['reciept'].patchValue(files[0].content);
    console.log("post data", event);
  }


}
