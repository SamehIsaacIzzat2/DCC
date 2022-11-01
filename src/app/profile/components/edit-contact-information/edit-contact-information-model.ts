import { Router } from '@angular/router';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { ContactInfo } from './../../interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { UserProfile } from '../../interfaces/interfaces';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { editCompState } from '../../Enums/edit-components.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditContactInformationModel {

    //==========================Data================================
    public contactInformationForm: FormGroup;
    public submitted: boolean;
    public endSub$ = new Subject()
  public stateMode: editCompState = 1;
  public sendEvent: EventEmitter<ContactInfo | null> = new EventEmitter();
  public currentUser:UserProfile;
    public preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.Egypt, CountryISO.SaudiArabia,];
    public searchCountryField = SearchCountryField;
    constructor(
        private fb: FormBuilder,
      private apiSer: APICallerService, private _router:Router,
      private authService: AuthenticationService,private snakSer:SnackService,
      private translate:TranslateService
    ) {
        this.initForm();
        this.setValues();
    }
  setValues() {
    this.authService.userProfileData$.pipe(takeUntil(this.endSub$)).subscribe(
      (userProfile: UserProfile | null) => {
        if (userProfile) {
          const contactInfo: ContactInfo = userProfile.contactInfo;
          this.f['workEmail'].setValue(contactInfo.workEmail);
          this.f['personalEmail'].setValue(contactInfo.personalEmail);
          this.f['officeNumber'].setValue(contactInfo.officeNumber);
          this.f['workNumber'].setValue(contactInfo.workNumber);
          this.f['mobileNumber'].setValue(contactInfo.mobileNumber);
        }
      }
    )
  }

    //==============================Logic==========================
    get f(): { [key: string]: AbstractControl } {
        return this.contactInformationForm.controls;
    }

    //##init-Form
    initForm() {
        this.contactInformationForm = this.fb.group({
            workEmail: [null, [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
            personalEmail: [null, [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
            officeNumber: [null],
            workNumber: [null],
            mobileNumber: [null, [Validators.required]],

        })
    }

    //save Edit button
    saveUpdate() {
        this.submitted = true;
        if (this.contactInformationForm.invalid) return;
        const resBody:ContactInfo = {
          workEmail: this.f['workEmail']?.value,
          personalEmail: this.f['personalEmail']?.value,
          officeNumber: this.f['officeNumber']?.value?.internationalNumber,
          workNumber: this.f['mobileNumber']?.value?.internationalNumber,
          mobileNumber: this.f['mobileNumber']?.value?.internationalNumber,
        }

      if (this.stateMode === editCompState.EditSectionState) {
        this.apiSer
          .put(APIs.profile.EditContactInformation
            , resBody)
          .pipe(takeUntil(this.endSub$))
          .subscribe((res) => {
            if (!res.isError) {
              this.snakSer.snack('Info Updated Successfully');
              this._router.navigate(['/profile/contact'])
              this.authService.userProfileData$.next({
                ...this.currentUser,
                contactInfo: resBody
              });
            } else {
              this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'));
            }
          });
      } else {
        this.sendEvent.emit(resBody)
      }

    }

}
