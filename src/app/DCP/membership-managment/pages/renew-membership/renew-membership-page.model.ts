import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { Step } from 'src/app/SharedModule/Components/steeper/iStepper.interface';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { LicenseInfoComponent } from '../../components/license-info/license-info.component';
import { CompanyInformationComponent } from '../../components/company-information/company-information.component';
import { AttachmentsMembershipComponent } from '../../components/attachments-membership/attachments-membership.component';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { RenewLicenceInfoComponent } from './components/renew-licence-info/renew-licence-info.component';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { lookupInterfcae } from 'src/app/SharedModule/Interfaces/lookup.interface';

@Injectable()
export class RenewMembershipModel {
  //=====================Data=========================
  public hideActions: boolean = false
  private endSub$ = new Subject();
  public activeStep: number = 1;
  public requestId:any
  banner: iBanner = {
    breadCrump: [
      {
        title: this.translateSer.instant('bannerData.breadCrump.home'),
        link: '/dcc/services',
      },
      {
        title: this.translateSer.instant('bannerData.breadCrump.memberships'),
        link: '/dcc/services/memberships',
      },
      {
        title: this.translateSer.instant('bannerData.breadCrump.renewMemberShip'),
        link: '',
      },
    ],
    subbreadCrump: [],
    title: this.translateSer.instant('bannerData.breadCrump.renewMemberShip'),
  };
  steps: Step[] = [
    {
      stepIndex: 1,
      stepTitle: this.translateSer.instant(
        'memberShipsModule.steeper.licenseInformation'
      ),
    },
    {
      stepIndex: 2,
      stepTitle: this.translateSer.instant(
        'memberShipsModule.steeper.companyInformation'
      ),
    },
    {
      stepIndex: 3,
      stepTitle: this.translateSer.instant(
        'memberShipsModule.steeper.attachments'
      ),
    },
    {
      stepIndex: 4,
      stepTitle: this.translateSer.instant('shared.generalWord.preview'),
    },
    {
      stepIndex: 5,
      stepTitle: this.translateSer.instant('bannerData.bannerNavigationLinks.payment'),
    },
  ];
  public LicenseInfoComponent: LicenseInfoComponent;
  public CompanyInformationComponent: CompanyInformationComponent;
  public AttachmentsMembershipComponent: AttachmentsMembershipComponent;
  public finalData: any = [];
  public viewCompanyData: any[] = [];
  public viewPartnersData: any[] = [];
  public viewAttachmentsData: any[] = [];
  public licenceData:any[]=[];
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
  allData:any

  public licenseRenew:RenewLicenceInfoComponent
  constructor(
    private _router: Router,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private translateSer: TranslateService,
    private lookupService: LookupService,
  ) { }

  public backForm() {
    this.activeStep = this.activeStep - 1;
    this.hideActions = false;
  }

  public nextStep() {
    console.log("this.licenseRenew.saveData()", this.licenseRenew);

    switch (this.activeStep) {
      case 1:
        if (this.licenseRenew.saveData()) {   
          this.activeStep = this.activeStep + 1;
        }
        break;
      case 2:
        if (this.licenseRenew.saveData()) {
          this.activeStep = this.activeStep + 1;
        }
        break;
      case 3:
        if (this.AttachmentsMembershipComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData =  this.AttachmentsMembershipComponent.model.attachments,
          this.perpareViewData(this.allData);
        }
        break;
      case 4:
        this.activeStep = this.activeStep + 1;
        this.hideActions = true;
        break;
      default:
        alert("rating");
      // this._router.navigate(['/profile/social']);
    }
  }


  submit(isDraft: boolean) {
    let id=this.licenseRenew.renewLicenseForm.controls['company'].value
    const apiPath = APIs.membership.renewMembership +'/'+ id +'/' + isDraft;
    this.apiSer
      .post(apiPath, this.finalData
      )
      .pipe(takeUntil(this.endSub$))
      .subscribe({
        next: (res) => {
          console.log("res", res)
          this.activeStep = this.activeStep + 1
            this.requestId=res.result.id;
            this.hideActions = true;
        },
        error: () => {
          this.snakSer.snack(
            this.translateSer.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }


  cancel(){
    this._router.navigate(['/services']);
  }


    //get company details
    getComanyDetails(id:any) {
      let api=APIs.membership.getMemebershiipDetils+`/${id}`
      this.apiSer
        .get(api)
        .pipe(takeUntil(this.endSub$))
        .subscribe((res:any) => {
          console.log("resoposd", res)
          this.licencePerpareViewData(res.result)
          this.perpareViewData(res.result)
          this.allData=res
        });
    }

    public perpareViewData(data:any) {
      let AllData={
        ...data.companyInfo,
        ...data.licenseInfo,
      }
      this.viewCompanyData = [
        {
          title: this.translateSer.instant("memberShipsModule.license.companyNameArabic"),
          data: AllData["companyArabicName"]
        },
        {
          title: this.translateSer.instant("memberShipsModule.license.companyNameEnglish"),
          data: AllData["companyEnglishName"]
        },
        {
          title: this.translateSer.instant("memberShipsModule.license.licenseExpirtyDate"),
          data: AllData["licenseExpiryDate"]
        },
        {
          title: this.translateSer.instant("memberShipsModule.license.membershipDuration"),
          data: AllData["membershipDuration"]==1 ? this.translateSer.instant("memberShipsModule.license.yearly") : this.translateSer.instant("memberShipsModule.license.sameAsLicenseValidity")
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.legalStatus"),
          data: this.legalStatuses.filter(status => {
            return status.id == AllData["legalStatus"].id
          })[0].name
        }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.firmType"),
          data: AllData["firmType"] ? this.translateSer.instant("memberShipsModule.companyInformation.parentCompany") : this.translateSer.instant("memberShipsModule.license.branch")
        }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.parentCompany"),
          data: this.myCompanies.filter(company => {
            return company.id == AllData["parentCompany"]
          })[0]?.name
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.commercialRegistrationNumber"),
          data: AllData["commercialRN"]
        }, 
        {
          title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.phoneNumber"),
          data: AllData["companyPhonenumber"]
        },
         {
          title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.email"),
          data: AllData["companyEmailAddress"]
        },
         {
          title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.nationality"),
          data: this.nationalities.filter(nationality => {
            return nationality.id == AllData["companyNationality"].id
          })[0].name
        }, 
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.commercialRegistrationType"),
          data: this.commercialRegistrationTypes.filter(type => {
            return type.id == AllData["commercialRegisterationtype"].id
          })[0]?.name
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenseType"),
          data: this.licenseTypes.filter(type => {
            return type.id == AllData["licenseType"].id
          })[0].name
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenseCategory"),
          data: this.licenseCategories.filter(category => {
            return category.id == AllData["licenseCategory"].id
          })[0].name
        }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenseIssueDate"),
          data: AllData["licenseIssueDate"].split("T")[0]
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenseNationality"),
          data: this.licenseNationalities.filter(nationality => {
            return nationality.id == AllData["licenseNationality"].id
          })[0]?.name
        }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.faxNumber"),
          data: AllData["faxNumber"]
        }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.POBOX"),
          data: AllData["poBox"]
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.buildingNumber"),
          data: AllData["buildingNumber"]
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.streetAddress"),
          data: AllData["companyStreetAddress"]
        },
        //  {
        //   title: this.translateSer.instant("memberShipsModule.companyInformation.issuingAuthority"),
        //   data: this.authorities.filter(authority => {
        //     return authority.id == AllData["issueAuthority"].id
        //   })[0]?.name
        // }, 
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenceIssuer"),
          data: this.issuers.filter(issuer => {
            return issuer.id == AllData["licenseIssuer"].id
          })[0]?.name
        },
         {
          title: this.translateSer.instant("memberShipsModule.companyInformation.makaniNumber"),
          data: AllData["makaniNumber"]
        }
      ];
    
      data.partnerInfo.forEach((partner:any) => {
        console.log("partners", partner);
        this.viewPartnersData.push({
          partnerNameEnglish: partner.partnerNameEnglish,
          partnerNameArabic: partner.partnerNameArabic,
         typeRelationShip: this.relationTypes.filter(re=> {return re.id == partner.typeOfRelation['id']})[0].name,
          ownershipPercent: partner.ownershipPercent,
          passportNumber: partner.passportNumber,
          emiratesID: partner.emiratesID,
          residenceNumber: partner.residenceNumber, 
          nationality: this.nationalities.filter(re=> {return re.id == partner.nationality['id']})[0].name,
          jobTitle: this.jobTitils.filter(re=> {return re.id == partner.jobTitle['id']})[0].name,
          partnerID: partner.partnerID
        })
      });
      // console.log(this.AttachmentsMembershipComponent.model.attachments);
      this.viewAttachmentsData=data.documents;
    }
  



    //for first step
    public licencePerpareViewData(data:any) {
      this.licenceData = [
        // {
        //   title: this.translateSer.instant("memberShipsModule.companyInformation.issuingAuthority"),
        //   data: this.authorities.filter(authority => {
        //     return authority.id == data.licenseInfo["issueAuthority"]
        //   })[0]?.name
        // },
  
        {
          title: this.translateSer.instant("memberShipsModule.companyInformation.licenceNumber"),
          data:data.licenseInfo["licenseNumber"]
        },

        {
          title: this.translateSer.instant("memberShipsModule.license.companyNameEnglish"),
          data: data.companyInfo["companyEnglishName"]
        },


        {
          title: this.translateSer.instant("memberShipsModule.license.companyNameArabic"),
          data: data.companyInfo["companyArabicName"]
        },
  
        {
          title: this.translateSer.instant("memberShipsModule.license.licenseExpirtyDate"),
          data: data.licenseInfo["licenseExpiryDate"].split("T")[0]
        },

        {
          title: this.translateSer.instant("memberShipsModule.license.membershipDuration"),
          data: data.licenseInfo["membershipDuration"]==1 ? this.translateSer.instant("memberShipsModule.license.yearly") : this.translateSer.instant("memberShipsModule.license.sameAsLicenseValidity")
        },
      
      ];
    }


    public endsubs() {
      this.endSub$.next('');
      this.endSub$.complete();
    }




    //get selected data
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
        console.log("relation types", relationTypes);
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
  
}
