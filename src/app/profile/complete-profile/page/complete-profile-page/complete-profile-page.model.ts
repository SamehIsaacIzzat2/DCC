import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { EditSocialInformationComponent } from './../../../components/edit-social-information/edit-social-information.component';
import { EditSocialInformation } from './../../../components/edit-social-information/edit-social-information';
import { EditContactInformationComponent } from './../../../components/edit-contact-information/edit-contact-information.component';
import { SocialInfo, UserProfile } from 'src/app/profile/interfaces/interfaces';
import { EditGeneralInformationComponent } from './../../../components/edit-general-information/edit-general-information.component';
import { GeneralInfo, AddressInfo, ContactInfo } from './../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { Step } from 'src/app/SharedModule/Components/steeper/iStepper.interface';
import { EditAddressInformationComponent } from 'src/app/profile/components/edit-address-information/edit-address-information.component';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class completeProfileModel {
  //======================Data====================
  endSub$ = new Subject();
  banner: iBanner = {
    title: this.translate.instant('bannerData.breadCrump.editProfile'),
    breadCrump: [
      { title: this.translate.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translate.instant('profileModule.myProfile'), link: '/profile/general' },
      { title: this.translate.instant('bannerData.breadCrump.editProfile'), link: '/profile/complete-profile' },
      ],
    subbreadCrump: [],
  };
  steps: Step[] = [
    {
      stepIndex: 1,
      stepTitle:this.translate.instant('profileModule.stepper.generalInfo'),
    },
    {
      stepIndex: 2,
      stepTitle:this.translate.instant('profileModule.stepper.addressInfo'),
    },
    {
      stepIndex: 3,
      stepTitle:this.translate.instant('profileModule.stepper.contactInfo'),
    },
    {
      stepIndex: 4,
      stepTitle:this.translate.instant('profileModule.stepper.socialInfo'),
    },
    {
      stepIndex: 5,
      stepTitle:this.translate.instant('shared.generalWord.preview'),
    },
  ];
  public activeStep: number = 1;
  //*************  Edit components instances  **********/
  public editGeneralInfoComp: EditGeneralInformationComponent;
  public editAdressInfoComp: EditAddressInformationComponent;
  public editContactInfoComp: EditContactInformationComponent;
  public editSocialInfoComp: EditSocialInformationComponent;
  //**************************************************** */
  public finalUserProfileResponse: UserProfile = {} as UserProfile;
  //=================Constructor==================
  constructor(public translate:TranslateService
    ,private apiSer: APICallerService, private _router: Router, private authSer: AuthenticationService, private snakSer:SnackService) {}

  public nextStep() {
    switch (this.activeStep) {
      case 1:
        this.editGeneralInfoComp.model.saveUpdate();
        break;
      case 2:
        this.editAdressInfoComp.model.saveUpdate();
        break;
      case 3:
        this.editContactInfoComp.model.saveUpdate();
        break;
      case 4:
        this.editSocialInfoComp.model.saveUpdate();
        break;

      default:
        this.activeStep = this.activeStep + 1;
        break;
    }
  }

  backForm(){
    // debugger
    this.activeStep = this.activeStep - 1;
  }

  public setGeneralinfo(event: GeneralInfo | null) {
    if(event){
      this.finalUserProfileResponse = {
        ...this.finalUserProfileResponse,
        generalInfo: event
      };
      this.activeStep = 2;
    }
    return;
  }

  public setAdressinfo(event:AddressInfo | null){
    if (event) {
      this.finalUserProfileResponse = {
        ...this.finalUserProfileResponse,
        addressInfo: event
      };
      this.activeStep = 3;
    }
    return;
  }
  public setContactinfo(event:ContactInfo | null){
    if (event) {
      this.finalUserProfileResponse = {
        ...this.finalUserProfileResponse,
        contactInfo: event
      };
      this.activeStep = 4;
    }
    return;
  }

  public setSocialinfo(event:SocialInfo | null){
    if (event) {
      this.finalUserProfileResponse = {
        ...this.finalUserProfileResponse,
        socialMediaInfo: event
      };
      //****** Before preview step send add submitted data to view components  **********//
      this.authSer.userProfileEditedData$.next(this.finalUserProfileResponse);
      this.activeStep = 5;
    }
    return;
  }

  submit() {
    this.apiSer
      .put(APIs.profile.EditProfile
        , this.finalUserProfileResponse)
      .pipe(takeUntil(this.endSub$))
      .subscribe({
        next: (res) => {
          if (!res.isError) {
            this.snakSer.snack('Info Updated Successfully');
            this._router.navigate(['/profile/complete-profile/success'])
            this.authSer.userProfileData$.next({
              ...this.finalUserProfileResponse
            });
          }
        },
        error:()=>{
          this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'));

        }
      });
  }

  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
