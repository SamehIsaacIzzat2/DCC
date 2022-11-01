import { lookupInterfcae } from './../../../../SharedModule/Interfaces/lookup.interface';
import { LookupService } from './../../../../SharedModule/Services/lookup.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Router } from '@angular/router';
import {
  Subject,
  takeUntil,
  combineLatest,
  BehaviorSubject,
  observable,
  Observable,
} from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { TranslateService } from '@ngx-translate/core';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';
import { createMask } from '@ngneat/input-mask';

@Injectable()
export class companyInformationModel {
  //======================Data====================
  endSub$ = new Subject();
  public companyForm: FormGroup;
  public partnerForm: FormGroup;
  public submitted: boolean = false;
  public partenerSubmitted:boolean = false;
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedArabEmirates,
    CountryISO.Egypt,
    CountryISO.SaudiArabia,
  ];
  public searchCountryField = SearchCountryField;
  public legalStatuses: lookupInterfcae[] = [];
  public companies: lookupInterfcae[] = [];
  public nationalities: lookupInterfcae[] = [];
  public licenseNationalities: lookupInterfcae[] = [];
  public licenseTypes: lookupInterfcae[] = [];
  public licenseCategories: lookupInterfcae[] = [];
  public authorities: lookupInterfcae[] = [];
  public issuers: lookupInterfcae[] = [];
  public activities: lookupInterfcae[] = [];
  public specialActivities: lookupInterfcae[] = [];
  public firmTypes: lookupInterfcae[] = [];
  public myCompanies: lookupInterfcae[] = [];
  public relationTypes: lookupInterfcae[] = [];
  public jobTitils:lookupInterfcae[]=[];
  public commercialRegistrationTypes:lookupInterfcae[]=[];

  public selectedActivities: any[] = [];
  public selectedSpecialActivities: any[] = [];
  public partners: any[] = [];
  public today: string = '';
  public defaultDate: any = null;
  public isBranchCompany:boolean=false;
  public Idval:any;
  public emiratesIdInputMask:any = createMask('999-9999-9999999-9');
  public totalPartnersPercentage = 0;
  public totalPartnersPercentageError = "";

  //=================Constructor==================
  constructor(
    private apiSer: APICallerService,
    public authSer: AuthenticationService,
    private fb: FormBuilder,
    private snakSer: SnackService,
    public translate: TranslateService,
    private lookupService: LookupService,
    private modalService: FormModalService
  ) {
    this.initForm();
  }

  initForm() {
    this.companyForm = this.fb.group({
      legalStatus: [null, Validators.required],
      parentCompany: [''],
      commercialRN: [null, Validators.required],
      commercialRegisterationtype: [null, Validators.required],
      companyEmailAddress: [
        null,
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ],
      ],
      companyPhonenumber: [null, Validators.required],
      companyNationality: [null, Validators.required],
      licenseType: [null, Validators.required],
      licenseCategory: [null, Validators.required],
      licenseNationality: [null, Validators.required],
      firmType: [null, Validators.required],
      buildingNumber: [null, Validators.required],
      companyStreetAddress: [null, Validators.required],
      faxNumber: [null, Validators.required],
    //  issuingAuthority: [null, Validators.required],
      licenseIssuer: [null, Validators.required],
      makaniNumber: [null, Validators.required],
      activities: [null],
      specialActivities: [null],
      poBox: [null, Validators.required],
      licenseIssueDate: [null, Validators.required],
    });
    this.partnerForm = this.fb.group({
      partnerNameEnglish: [null, Validators.required],
      partnerNameArabic: [null, Validators.required],
      typeRelationShip: [null, Validators.required],
      ownershipPercent: [null,[Validators.required ]],
      passportNumber: [null, Validators.required],
      emiratesID: [null, Validators.required],
      residenceNumber: [null, Validators.required],
      nationality: [null, Validators.required],
      jobTitle: [null, Validators.required],
      partnerID: [null, Validators.required],
    });
  }
  selectFirmType(passedValue:any){
    // to check if user select branch company or parent company

    if(passedValue.target.value==='0'){
      this.isBranchCompany=true;
    }else{
      this.isBranchCompany=false;

    }
  }
  visitFeild(data:any){
    if(data==''){
      this.Idval='784';
    }else{
      this.Idval=data;
    } 

  }

  checkFeildContent(data:any){
      // clear EmirateId Feild if user only touch it without enterning numbers

    if(data=="784"){
      this.Idval='';
    } 
    else{
      this.Idval=data;
    }
 
  }

  getSelectData() {
    const authorities$ = this.lookupService.getAuthorities();
    authorities$.pipe(takeUntil(this.endSub$)).subscribe((authority) => {
      this.authorities = authority;
    });

    const legalStatuses$ = this.lookupService.getlegalStatuses();
    legalStatuses$.pipe(takeUntil(this.endSub$)).subscribe((legalStatuses) => {
      this.legalStatuses = legalStatuses;
    });

    const nationalities$ = this.lookupService.getNatioanlities();
    nationalities$.pipe(takeUntil(this.endSub$)).subscribe((nationalities) => {
      this.nationalities = nationalities;
    });


    const licenseNationalities$ = this.lookupService.getLicenseNatioanlities();
    licenseNationalities$.pipe(takeUntil(this.endSub$)).subscribe((nationalities) => {
      this.licenseNationalities = nationalities;
    });


    const companies$ = this.lookupService.getPartnerCompanies();
    companies$.pipe(takeUntil(this.endSub$)).subscribe((companies) => {
      this.companies = companies;
    });

    const licenseTypes$ = this.lookupService.getlicenseTypes();
    licenseTypes$.pipe(takeUntil(this.endSub$)).subscribe((licenseTypes) => {
      this.licenseTypes = licenseTypes;
    });

    const licenseCategories$ = this.lookupService.getlicenseCategories();
    licenseCategories$
      .pipe(takeUntil(this.endSub$))
      .subscribe((licenseCategories) => {
        this.licenseCategories = licenseCategories;
      });

    const issuers$ = this.lookupService.getlicenseIssuers();
    issuers$.pipe(takeUntil(this.endSub$)).subscribe((issuers) => {
      this.issuers = issuers;
    });

    const firmTypes$ = this.lookupService.getfirmTypes();
    firmTypes$.pipe(takeUntil(this.endSub$)).subscribe((firmTypes) => {
      this.firmTypes = firmTypes;
    });

    const activities$ = this.lookupService.getActivities();
    activities$.pipe(takeUntil(this.endSub$)).subscribe((activities) => {
      this.activities = activities;
    });

    const specialActivities$ = this.lookupService.getSpecialActivities();
    specialActivities$
      .pipe(takeUntil(this.endSub$))
      .subscribe((specialActivities) => {
        this.specialActivities = specialActivities;
      });

    const jobTitles$ = this.lookupService.getTitles();
    jobTitles$.pipe(takeUntil(this.endSub$)).subscribe((jobs) => {
      this.jobTitils = jobs;
    });

    const relationTypes$ = this.lookupService.getRelationTypes();
    relationTypes$.pipe(takeUntil(this.endSub$)).subscribe((relationTypes) => {
      this.relationTypes = relationTypes;
    });

    const myCompanies$ = this.lookupService.getMyCompanies();
    myCompanies$.pipe(takeUntil(this.endSub$)).subscribe((myCompanies) => {
      this.myCompanies = myCompanies;
    });

    const commercialRegistrationTypes$ = this.lookupService.getcommercialRegisterTypes();
    commercialRegistrationTypes$.pipe(takeUntil(this.endSub$)).subscribe((commercialRegistrationTypes) => {
      this.commercialRegistrationTypes = commercialRegistrationTypes;
    });

  }

  onKeyUpHandler(actName = '') { }

  public addOpt(arr: any[], controlsName: string, opt: any) {
    console.log('before adding opt', arr, controlsName, opt);
    if (
      arr.indexOf(opt) == -1 &&
      arr.find((ele) => ele.id == opt.id) == undefined
    ) {
      delete opt.inductriesId;
      delete opt.productsId;
      arr.push(opt);
    } else {
      this.snakSer.snack(`${opt.name} is already added`);
    }
    // console.log(this.selectedActivities);
    // console.log(this.selectedSpecialActivities);
    // console.log("After adding opt",arr);
    this.companyForm.controls[controlsName].reset();
  }

  public removeOpt(arr: any[], opt: any) {
    arr.splice(
      arr.findIndex((ele) => ele.id == opt.id),
      1
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyForm.controls;
  }

  get fPartner(): { [key: string]: AbstractControl } {
    return this.partnerForm.controls;
  }

  saveData() {
    // return true;
    this.submitted = true;
    console.log("valid", this.companyForm);
    if (this.companyForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return false;
    }
    if(this.partners.length!=0){
      if(this.totalPartnersPercentage!=100){
        this.snakSer.snack(
          this.translate.instant('memberShipsModule.companyInformation.partnersPercentageError')
        );
        return false;
      }
    }
    return true;
  }

  public endSubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.authSer.isAuthenticated.asObservable();
  }

  onCancelPartner() {
    this.modalService.hide();
  }

  onSubmitPartner() {
    this.partenerSubmitted = true;
    if (this.partnerForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return
    } else if(!this.validatePercentage(this.partnerForm.value.ownershipPercent)){
      return;
    } else {
      console.log("partern fom value", this.partnerForm.value);
      
      this.partners.push(this.partnerForm.value);
      this.partnerForm.reset();
      this.modalService.hide();
      this.partenerSubmitted = false;
    }
  }

  removePartner(index: number) {
    this.partners.splice(index, 1);
    this.totalPartnersPercentage=0;
    for (let index = 0; index < this.partners.length; index++) {
      this.totalPartnersPercentage += this.partners[index].ownershipPercent;
    }
  }

  validatePercentage(event:any){
    this.totalPartnersPercentage=0;
    for (let index = 0; index < this.partners.length; index++) {
      this.totalPartnersPercentage += Number(this.partners[index].ownershipPercent);
    }
    if(Number(this.totalPartnersPercentage)+Number(event)>100){
      this.totalPartnersPercentageError=this.translate.instant('memberShipsModule.companyInformation.partnersPercentageError');
      return false;
    }
    this.totalPartnersPercentage+=Number(event);
    this.totalPartnersPercentageError="";
    return true;
  }

  getSelectedRelationship(id: string) {
    return this.relationTypes.filter((type) => {
      return type.id == id;
    })[0]?.name;
  }

  getSelectedNationality(id: string) {
    return this.nationalities.filter((nationality) => {
      return nationality.id == id;
    })[0]?.name;
  }

  getSelectedJobTitle(id: string) {
    return this.jobTitils.filter((jobTitle) => {
      return jobTitle.id == id;
    })[0]?.name;
  }

  //date picker
  datePicker(event: any) {
    this.companyForm.controls['licenseIssueDate'].setValue(event);
  }
}
