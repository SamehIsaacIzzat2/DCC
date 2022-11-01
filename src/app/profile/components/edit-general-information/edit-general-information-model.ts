import { LookupService } from './../../../SharedModule/Services/lookup.service';
import { editCompState } from './../../Enums/edit-components.enum';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, combineLatest, pluck } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { GeneralInfo, UserProfile } from '../../interfaces/interfaces';
import { RequireMatch } from 'src/app/SharedModule/validators/exactMatch';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditGeneralInformationModel {
  //=====================Data=========================
  public generalInformationForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public jobTitles: any[] = [];
  public registerForm: any;
  public nationalities: any[];
  public currentImage: string = '';
  public stateMode: editCompState = 1;
  public sendEvent: EventEmitter<GeneralInfo | null> = new EventEmitter();
  public currentUser: UserProfile;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private apiSer: APICallerService,
    private authService: AuthenticationService,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private translate: TranslateService
  ) {
    this.initForm();
    this.getSelectData();
  }

  // init data in form
  initForm() {
    this.generalInformationForm = this.fb.group({
      photo: [null, [Validators.required]],
      title: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ],
      ],
      nationalityId: [null, [Validators.required]],
      emiratesID: [null, [Validators.maxLength(18), Validators.minLength(15)]],
      passportNumber: [null],
      unifiedId: [null],
    });
  }
  // get All Look up feilds
  getSelectData() {
    const jobTitles = this.lookupSer.getTitles();
    const nationalities = this.lookupSer.getNatioanlities();
    combineLatest([jobTitles, nationalities])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([jobs, nations]) => {
        this.jobTitles = jobs;
        this.nationalities = nations;
        this.setValues();
      });
  }
  // set intial data
  setValues() {
    this.authService.userProfileData$
      .pipe(takeUntil(this.endSub$))
      .subscribe((userProfile: UserProfile | null) => {
        if (userProfile) {
          // console.log(userProfile.generalInfo)
          this.currentUser = userProfile;
          const generalInfo: GeneralInfo = userProfile.generalInfo;
          this.f['title'].setValue(generalInfo.title);
          this.f['firstName'].setValue(generalInfo.firstName);
          this.f['lastName'].setValue(generalInfo.lastName);
          this.f['email'].setValue(generalInfo.email);
          this.f['nationalityId'].setValue(
            this.nationalities.find(
              (nation) => nation.id === generalInfo.nationalityId
            ).id
          );
          this.f['emiratesID'].setValue(generalInfo.emiratesID);
          this.f['passportNumber'].setValue(generalInfo.passportNumber);
          this.f['unifiedId'].setValue(generalInfo.unifiedId);
          if (generalInfo.photo) {
            this.currentImage = generalInfo.photo;
            // remove validation for already uploaded avatars
            const photoControl = this.f['photo'];
            this.generalInformationForm.patchValue({
              photo: generalInfo.photo,
            });
            photoControl.removeValidators(Validators.required);
            photoControl.updateValueAndValidity();
          }
        }
      });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.generalInformationForm.controls;
  }

  onUploadImage(imageBase64: string) {
    const base64String = imageBase64.split(',')[1];
    this.generalInformationForm.patchValue({
      photo: base64String,
    });
  }

  saveUpdate() {
    this.submitted = true;
    // console.log(this.generalInformationForm)
    if (this.generalInformationForm.invalid) return;
    const submittedData: GeneralInfo = {
      ...this.generalInformationForm.value,
      nationalityId: this.f['nationalityId'].value,
      emiratesID: this.f['emiratesID'].value.replaceAll('-', ''),
    };
    if (this.stateMode === editCompState.EditSectionState) {
      this.apiSer
        .put(APIs.profile.EditGeneralInformation, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: (res) => {
            if (!res.isError && res.result && res.result.isSuccedded) {
              this.snakSer.snack('Info Updated Successfully');
              this.authService.userProfileData$.next({
                ...this.currentUser,
                generalInfo: submittedData,
              });
              this._router.navigate(['/profile/general']);
            }
          },
          error: () => {
            this.snakSer.snack(
              this.translate.instant('shared.generalWord.wrongSomeThing')
            );
          },
        });
    } else {
      this.sendEvent.emit(submittedData);
    }
  }

  public endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
