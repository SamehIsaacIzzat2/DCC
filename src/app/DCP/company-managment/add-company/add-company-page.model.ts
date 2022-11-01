import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from './../company-profile/services/company.service';
import {
  compGeneralInfo,
  compAddressInfo,
  compSocialInfo,
  companyInterface,
} from './../company-profile/interfaces/company.interface';
import { EditContactInfoComponent } from './../company-profile/components/edit-contact-info/edit-contact-info.component';
import { EditSocialInfoComponent } from './../company-profile/components/edit-social-info/edit-social-info.component';
import { EditGeneralInfoComponent } from './../company-profile/components/edit-general-info/edit-general-info.component';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { Step } from 'src/app/SharedModule/Components/steeper/iStepper.interface';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Injectable()
export class AddCompanyModel {
  //=====================Data=========================
  public finalCompanyResponse: companyInterface = {} as companyInterface;
  private endSub$ = new Subject();
  public activeStep: number = 1;
  banner: iBanner = {
    breadCrump: [
      {
        title: this.translateSer.instant('bannerData.breadCrump.home'),
        link: '/services',
      },
      {
        title: this.translateSer.instant('bannerData.breadCrump.companies'),
        link: '/services/companys',
      },
      {
        title: this.translateSer.instant('bannerData.breadCrump.addCompany'),
        link: '',
      },
    ],
    subbreadCrump: [],
    title: this.translateSer.instant('bannerData.breadCrump.addCompany'),
  };
  steps: Step[] = [
    {
      stepIndex: 1,
      stepTitle: this.translateSer.instant('companyModule.general.title'),
    },
    {
      stepIndex: 2,
      stepTitle: this.translateSer.instant('companyModule.contact.stepTitle'),
    },
    {
      stepIndex: 3,
      stepTitle: this.translateSer.instant('companyModule.socail.title'),
    },
    {
      stepIndex: 4,
      stepTitle: this.translateSer.instant('shared.generalWord.preview'),
    },
  ];
  public editGeneralInfoComp: EditGeneralInfoComponent;
  public editAdressInfoComp: EditContactInfoComponent;
  public editSocialInfoComp: EditSocialInfoComponent;
  constructor(
    private _router: Router,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private compSer: CompanyService,
    private translateSer: TranslateService
  ) { }

  public backForm() {
    this.activeStep = this.activeStep - 1;
  }

  //=======================Logic========================

  public nextStep() {
    switch (this.activeStep) {
      case 1:
        this.editGeneralInfoComp.model.saveUpdate();
        break;
      case 2:
        this.editAdressInfoComp.model.saveUpdate();
        break;
      case 3:
        this.editSocialInfoComp.model.saveUpdate();
        break;
      default:
        this.activeStep = this.activeStep + 1;
        break;
    }
  }

  setGeneralinfo(evt: compGeneralInfo | null) {
    if (evt) {
      this.finalCompanyResponse = {
        ...this.finalCompanyResponse,
        generalInfo: evt,
      };
      this.activeStep = 2;
    }
    return;
  }

  setAdressinfo(evt: compAddressInfo | null) {
    if (evt) {
      this.finalCompanyResponse = {
        ...this.finalCompanyResponse,
        addressAndContactInfo: evt,
      };
      this.activeStep = 3;
    }
    return;
  }
  setSocialinfo(evt: compSocialInfo | null) {
    if (evt) {
      this.finalCompanyResponse = {
        ...this.finalCompanyResponse,
        socialAndOtherInfo: evt,
      };
      //****** Before preview step send add submitted data to view components  **********//
      this.compSer.companyEditedDetails$.next(this.finalCompanyResponse);
      this.activeStep = 4;
    }
    return;
  }

  submit() {
    this.apiSer
      .post(APIs.Companys.getCompany, {
        ...this.finalCompanyResponse,
        communicationSetting: { emailReceivers: [], smsReceivers: [] },
      })
      .pipe(takeUntil(this.endSub$))
      .subscribe({
        next: (res) => {
          if (!res.isError) {
            this._router.navigate(['dcc/services/companys/add-company/success/']);
          }
        },
        error: () => {
          this.snakSer.snack(
            this.translateSer.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }

  public endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
