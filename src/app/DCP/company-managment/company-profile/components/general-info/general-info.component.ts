import { APICallerService } from './../../../../../CallerModule/Services/APICaller.service';
import { lookupInterfcae } from './../../../../../SharedModule/Interfaces/lookup.interface';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { CompanyService } from './../../services/company.service';
import {
  companyInterface,
  compGeneralInfo,
} from './../../interfaces/company.interface';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { viewCompState } from 'src/app/profile/Enums/edit-components.enum';
import { UserProfile } from 'src/app/profile/interfaces/interfaces';
import { APIs } from 'src/app/CallerModule/Data/APIs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  @Input() stateMode: viewCompState = 1;
  //=========================Data=======================
  private endSub$ = new Subject();
  GeneralData: compGeneralInfo;
  cmopnaySizes: lookupInterfcae[]=[];
  sectors: lookupInterfcae[] = [];
  entityTypes: lookupInterfcae[] = [];
  annualTurnover: lookupInterfcae[] = [];
  noOfEmplyees: lookupInterfcae[] = [];
  companies: any[]=[];
  constructor(private compSer: CompanyService, public lookupSer: LookupService, private apiSer:APICallerService) {}

  ngOnInit(): void {
    this.getselectData();
    this.getCurrentCompany();
  }
  getselectData() {
    const cmopanySizes$ = this.lookupSer.getCompanySize()
    const sectors$ = this.lookupSer.getSectors()
    const entitytypes$ = this.lookupSer.getEntityTypes()
    const anuualTurnover$ = this.lookupSer.getAnuualTurnover()
    const noOfEmplyees$ = this.lookupSer.getNoOfEmplyees()
    // const industries$ = this.lookupSer.getIndustries()
    const Companies$ = this.apiSer.get(APIs.Companys.GetAll);

    combineLatest([cmopanySizes$, sectors$, entitytypes$, anuualTurnover$, noOfEmplyees$, Companies$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([sizes, sectors, entitytypes, anuualTurnover, noOfEmplyees, Companies]) => {
        this.cmopnaySizes = sizes;
        this.sectors = sectors;
        this.entityTypes = entitytypes;
        this.annualTurnover = anuualTurnover;
        this.noOfEmplyees = noOfEmplyees;
        // this.industries = industries;
        if (!Companies.isError) this.companies = Companies.result;
      });
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
          this.GeneralData = company.generalInfo;
        }
      });
  }


  public getcomapnyNameById(arr: any[], id: string | undefined) {
    if (arr && arr.length > 0 && id) {
      const element = arr.find((ele: any) => ele.id == id);
      return element?.entityName;
    }
    return "";
  }

  public commeSeperatedNames(arr: lookupInterfcae[]):string{
    return arr.map((ele)=>ele.name).join(", ")
  }

  // Component states / modes
  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit;
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview;
  }

  ngOnDestroy(): void {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
