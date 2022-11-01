import { compSocialInfo } from './../../interfaces/company.interface';
import { CompanyService } from './../../services/company.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { viewCompState } from 'src/app/profile/Enums/edit-components.enum';
import { companyInterface } from '../../interfaces/company.interface';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';

@Component({
  selector: 'app-social-info',
  templateUrl: './social-info.component.html',
  styleUrls: ['./social-info.component.scss']
})
export class SocialInfoComponent implements OnInit {
  @Input() stateMode: viewCompState = 1;
  //=========================Data=======================
  private endSub$ = new Subject();
  socialData: compSocialInfo;
  constructor(private compSer: CompanyService, public lookupSer: LookupService) { }

  ngOnInit(): void {
    this.getCurrentCompany()
  }


  getCurrentCompany() {
    let obs$: BehaviorSubject<companyInterface | null>;
    this.getViewAndEditState()
      ? (obs$ = this.compSer.companyDetails$)
      : (obs$ = this.compSer.companyEditedDetails$);
    obs$
      .pipe(takeUntil(this.endSub$))
      .subscribe((company: companyInterface | null) => {
        if (company) {
          this.socialData = company.socialAndOtherInfo;
        }
      });
  }



  // Component states / modes
  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }



  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete()
  }


}
