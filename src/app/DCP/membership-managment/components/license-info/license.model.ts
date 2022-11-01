import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit, Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { createMask } from '@ngneat/input-mask';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { lookupInterfcae } from 'src/app/SharedModule/Interfaces/lookup.interface';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class License implements OnInit {
  public licenseForm: FormGroup;
  public verified: boolean = false;
  public submitted: boolean = false;
  public verifyType: string = '';
  public isLessThanYear: boolean = true;
  public authorities: lookupInterfcae[] = [];
  private endSub$ = new Subject();
  public x = 'xxx';
  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private apiCallerService: APICallerService,
    private snakSer: SnackService,
    private translateSer: TranslateService
  ) {
    this.build();
  }

  ngOnInit(): void { }

  // get Look up feilds
  getSelectData() {
    const authorities$ = this.lookupService.getAuthorities();
    authorities$.pipe(takeUntil(this.endSub$)).subscribe((authority) => {
      this.authorities = authority;
    });
  }

  build() {
    this.licenseForm = this.fb.group({
      issueAuthority: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      company: [null],
      companyEnglishName: [null, Validators.required],
      companyArabicName: [null, Validators.required],
      licenseExpiryDate: [null, Validators.required],
      membershipDuration: [null, Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.licenseForm.controls;
  }

  //verify authority and lances number
  verify(type: string) {
    let companyControl = this.licenseForm.controls['company'];
    let licenseNumberControl = this.licenseForm.controls['licenseNumber'];
    let issueAuthorityControl = this.licenseForm.controls['issueAuthority'];
    this.submitted = true;
    this.verifyType = type;
    let verifyData;
    if (type === 'license') {
      if (licenseNumberControl.invalid || issueAuthorityControl.invalid) return;
      companyControl.clearValidators();
      companyControl.updateValueAndValidity();
      verifyData = {
        company: '',
        licenseNumber: licenseNumberControl.value,
        issueAuthority: issueAuthorityControl.value,
      };
    }
    if (type === 'company') {
      if (companyControl.invalid) return;
      licenseNumberControl.clearValidators();
      licenseNumberControl.updateValueAndValidity();
      issueAuthorityControl.clearValidators();
      issueAuthorityControl.updateValueAndValidity();
      verifyData = {
        company: companyControl.value,
        licenseNumber: '',
        issueAuthority: '',
      };
    }

    this.apiCallerService
      .post(APIs.membership.VerifyLicense, verifyData)
      .pipe(takeUntil(this.endSub$))
      .subscribe(
        (res) => {
          this.verified = true;
          this.snakSer.snack(
            this.translateSer.instant(
              'memberShipsModule.companyInformation.verifiedSuccessfully'
            )
          );
        },
        (err) => {
          this.snakSer.snack(
            this.translateSer.instant('shared.generalWord.wrongSomeThing')
          );
        }
      );
  }

  //date picker
  datePicker(event: any) {
    this.licenseForm.controls['licenseExpiryDate'].setValue(event);
    let oneYearFromNow = moment().add(12, 'M').format();
    const licenseExpiryTimeStamp=(new Date(event)).getTime();
    const oneYearFromNowTimeStamp=(new Date(oneYearFromNow)).getTime();
    if (licenseExpiryTimeStamp < oneYearFromNowTimeStamp) {
      this.isLessThanYear = false;
    } else {
      this.isLessThanYear = true;
    }
  }

  saveData() {
    // return true;
    this.submitted = true;
    if (!this.verified) {
      this.snakSer.snack(
        this.translateSer.instant('shared.generalWord.verifyFirst')
      );
      return false;
    }
    if (this.verifyType == "license") {
      if (!this.licenseForm.controls.issueAuthority.value || !this.licenseForm.controls.licenseNumber.value) {
        this.snakSer.snack(
          this.translateSer.instant('shared.generalWord.requiredData')
        );
        return false;
      }
    } else {
      if (
        !this.licenseForm.controls.companyEnglishName.value ||
        !this.licenseForm.controls.companyArabicName.value ||
        !this.licenseForm.controls.licenseExpiryDate.value||
        !this.licenseForm.controls.membershipDuration.value) {
        this.snakSer.snack(
          this.translateSer.instant('shared.generalWord.requiredData')
        );
        return false;
      }
    }
    return true;
  }

}
