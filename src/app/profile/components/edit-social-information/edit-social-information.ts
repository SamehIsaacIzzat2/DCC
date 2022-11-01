import { Router } from '@angular/router';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { SocialInfo } from './../../interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { EventEmitter, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { UserProfile } from '../../interfaces/interfaces';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { editCompState } from '../../Enums/edit-components.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditSocialInformation {
  //===========================Data================================
  public editSocailInformationForm: FormGroup;
  public submitted: boolean;
  public endSub$ = new Subject();
  public stateMode: editCompState = 1;
  public sendEvent: EventEmitter<SocialInfo | null> = new EventEmitter();
  public currentUser:UserProfile;
  public pattren:string="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";
  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private authService: AuthenticationService,
    private snakSer: SnackService,
    private _router:Router,
    private translate:TranslateService
  ) {
    this.initForm();
    this.setValues();
  }
  setValues() {
    this.authService.userProfileData$
      .pipe(takeUntil(this.endSub$))
      .subscribe((userProfile: UserProfile | null) => {
        if (userProfile) {
          this.currentUser = userProfile;
          const socailInfo: SocialInfo = userProfile.socialMediaInfo;
          this.f['website'].setValue(socailInfo.website);
          this.f['linkedIn'].setValue(socailInfo.linkedIn);
          this.f['faceBook'].setValue(socailInfo.faceBook);
          this.f['insta'].setValue(socailInfo.insta);
          this.f['twitter'].setValue(socailInfo.twitter);
          this.f['others'].setValue(socailInfo.others);
        }
      });
  }

  //==============================Logic==========================
  get f(): { [key: string]: AbstractControl } {
    return this.editSocailInformationForm.controls;
  }

  //##init-Form
  initForm() {
    this.editSocailInformationForm = this.fb.group({
      website: [null,[Validators.pattern(this.pattren)]],
      linkedIn: [null,[Validators.pattern(this.pattren)]],
      faceBook: [null,[Validators.pattern(this.pattren)]],
      insta: [null,[Validators.pattern(this.pattren)]],
      twitter: [null,[Validators.pattern(this.pattren)]],
      others:[null,[Validators.pattern(this.pattren)]],
    });
  }

  //save Edit button
  saveUpdate() {
    this.submitted = true;
    if (this.editSocailInformationForm.invalid) return;
    const submittedData = this.editSocailInformationForm.value;

    if (this.stateMode === editCompState.EditSectionState) {
      this.apiSer
        .put(APIs.profile.EditSocialInformation, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe((res) => {
          if (!res.isError) {
            this.snakSer.snack('Info Updated Successfully');
            this._router.navigate(['/profile/social'])
            this.authService.userProfileData$.next({
              ...this.currentUser,
              socialMediaInfo: submittedData
            });
          } else {
            this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'));
          }
        });
    } else {
      this.sendEvent.emit(submittedData)
    }

  }
}
