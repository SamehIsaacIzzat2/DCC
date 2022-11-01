import { compCommunicationSettinggs } from './../../interfaces/company.interface';
import { CompanyService } from './../../services/company.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { viewCompState } from 'src/app/profile/Enums/edit-components.enum';
import { companyInterface } from '../../interfaces/company.interface';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';

@Component({
  selector: 'app-communication-setting',
  templateUrl: './communication-setting.component.html',
  styleUrls: ['./communication-setting.component.scss']
})
export class CommunicationSettingComponent implements OnInit,OnDestroy {
  @Input() stateMode: viewCompState = 1;
  //=========================Data=======================
  private endSub$ = new Subject();
  communicationData: compCommunicationSettinggs;
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
          this.communicationData = company.communicationSetting;
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
