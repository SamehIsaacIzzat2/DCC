import { CompanyService } from './../../services/company.service';
import {
  compGeneralInfo,
  companyInterface,
} from './../../interfaces/company.interface';
import { lookupInterfcae } from './../../../../../SharedModule/Interfaces/lookup.interface';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Subject,
  takeUntil,
  combineLatest,
  startWith,
  map,
  Observable,
} from 'rxjs';
import { Location } from '@angular/common';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditGeneralCompanyInformationModel {
  //=====================Data=========================
  public generalInfoForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public cmopnaySizes: lookupInterfcae[] = [];
  public sectors: lookupInterfcae[] = [];
  public entityTypes: lookupInterfcae[] = [];
  public annualTurnover: lookupInterfcae[] = [];
  public noOfEmplyees: lookupInterfcae[] = [];
  public industries: lookupInterfcae[] = [];
  public filteredOptionsInd: Observable<any[]>;
  public subEntities: Observable<any[]>;
  public companies: any[] = [];
  public stateMode: editCompState = 1;
  selectedIndustries: any[] = [];
  selectedSubEntites: any[] = [];
  public sendEvent: EventEmitter<compGeneralInfo | null> = new EventEmitter();
  currentData: companyInterface;
  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private compSer: CompanyService,
    private _location: Location,
    private translate: TranslateService
  ) {
    this.initForm();
    this.getSelectData();
  }

  // init data in form
  initForm() {
    this.generalInfoForm = this.fb.group({
      entityName: [null, Validators.required],
      sectorId: [null, Validators.required],
      entityTypeId: [null, Validators.required],
      annualTurnoverId: [null],
      companySizeId: [null, Validators.required],
      numberofEmployeesId: [null],
      parentEntityId: [null],
      subsidiaryEntitiesIds: [null],
      industryId: [null],
    });
  }
  // get All Look up feilds
  getSelectData() {
    const cmopanySizes$ = this.lookupSer.getCompanySize();
    const sectors$ = this.lookupSer.getSectors();
    const entitytypes$ = this.lookupSer.getEntityTypes();
    const anuualTurnover$ = this.lookupSer.getAnuualTurnover();
    const noOfEmplyees$ = this.lookupSer.getNoOfEmplyees();
    const industries$ = this.lookupSer.getIndustries();
    const Companies$ = this.apiSer.get(APIs.Companys.GetAll);

    combineLatest([
      cmopanySizes$,
      sectors$,
      entitytypes$,
      anuualTurnover$,
      noOfEmplyees$,
      industries$,
      Companies$,
    ])
      .pipe(takeUntil(this.endSub$))
      .subscribe(
        ([
          sizes,
          sectors,
          entitytypes,
          anuualTurnover,
          noOfEmplyees,
          industries,
          Companies,
        ]) => {
          this.cmopnaySizes = sizes;
          this.sectors = sectors;
          this.entityTypes = entitytypes;
          this.annualTurnover = anuualTurnover;
          this.noOfEmplyees = noOfEmplyees;
          this.industries = industries;
          if (!Companies.isError) this.companies = Companies.result;
          if (this.stateMode !== editCompState.SteeperStatte) this.setValues();
        }
      );
  }
  // set intial data
  setValues() {
    this.compSer.companyDetails$
      .pipe(takeUntil(this.endSub$))
      .subscribe((companyProfile: companyInterface | null) => {
        if (companyProfile) {
          console.log('com general info', companyProfile.generalInfo);
          this.companies = this.companies.filter(
            (ele) => ele.entityName != companyProfile.generalInfo.entityName
          );
          // this.companies.forEach((ele: any) => {
          //   console.log('forEach', ele);
          // });
          this.currentData = companyProfile;
          const generalInfo: compGeneralInfo = companyProfile.generalInfo;
          this.f['entityName'].setValue(generalInfo.entityName);
          this.f['sectorId'].setValue(generalInfo.sectorId);
          this.f['entityTypeId'].setValue(generalInfo.entityTypeId);
          this.f['annualTurnoverId'].setValue(generalInfo.annualTurnoverId);
          this.f['companySizeId'].setValue(generalInfo.companySizeId);
          this.f['numberofEmployeesId'].setValue(
            generalInfo.numberofEmployeesId
          );
          this.f['parentEntityId'].setValue(generalInfo.parentEntityId);
          // this.f['subsidiaryEntitiesIds'].setValue(
          //   generalInfo.subsidiaryEntitiesIds
          // );
          // this.f['industryId'].setValue(generalInfo.industryId);
          this.selectedIndustries = generalInfo.industrys ?? [];
          this.selectedSubEntites = generalInfo.subsiderys ?? [];
        }
      });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.generalInfoForm.controls;
  }

  setFilteration() {
    this.filteredOptionsInd = this.generalInfoForm.controls[
      'industryId'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.industries, value || ''))
    );
    this.subEntities = this.generalInfoForm.controls[
      'subsidiaryEntitiesIds'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.companies, value || ''))
    );
  }

  private _filter(arr: any[], value: any): string[] {
    const filterValue = value.toLowerCase();
    return arr.filter((option) =>
      option.name
        ? option.name.toLowerCase().includes(filterValue)
        : option.entityName.toLowerCase().includes(filterValue)
    );
  }

  public addOpt(arr: any[], controlsName: string, opt: any) {
    if (
      arr.indexOf(opt) == -1 &&
      arr.find((ele) => ele.id == opt.id) == undefined
    ) {
      arr.push(opt);
    } else {
      this.snakSer.snack(`${opt.name} is already added`);
    }
    this.generalInfoForm.controls[controlsName].reset();
  }

  public removeOpt(arr: any[], opt: any) {
    arr.splice(
      arr.findIndex((ele) => ele.id == opt.id),
      1
    );
  }

  saveUpdate() {
    this.submitted = true;
    if (this.generalInfoForm.invalid) return;
    const submittedData: compGeneralInfo = {
      ...this.generalInfoForm.value,
      industryId:
        this.selectedIndustries.length > 0
          ? this.selectedIndustries.map((ele) => ele.id).join(',')
          : null,
      subsidiaryEntitiesIds:
        this.selectedSubEntites.length > 0
          ? this.selectedSubEntites.map((ele) => ele.id).join(',')
          : null,
      industrys: this.selectedIndustries,
      subsiderys: this.selectedSubEntites,
    };
    if (this.stateMode === editCompState.EditSectionState) {
      const apiPath = `${APIs.Companys.editGeneralInfo}/${this.currentData.id}`;
      this.apiSer
        .put(apiPath, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: (res) => {
            if (!res.isError && res.result && res.result.isSuccedded) {
              this.snakSer.snack(
                this.translate.instant('shared.generalWord.updatedInfo')
              );

              this.compSer.companyDetails$.next({
                ...this.currentData,
                generalInfo: submittedData,
              });
              this._location.back();
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
