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

@Injectable()
export class NewMembershipModel {
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
        title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
        link: '',
      },
    ],
    subbreadCrump: [],
    title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
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
  public finalData: any = {};
  public viewCompanyData: any[] = [];
  public viewPartnersData: any[] = [];
  public viewAttachmentsData: any[] = [];
  constructor(
    private _router: Router,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private translateSer: TranslateService
  ) { }

  public backForm() {
    this.activeStep = this.activeStep - 1;
    this.hideActions = false;
  }

  public nextStep() {
    switch (this.activeStep) {
      case 1:
        if (this.LicenseInfoComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            ...this.LicenseInfoComponent.model.licenseForm.value
          };
        }
        break;
      case 2:
        if (this.CompanyInformationComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = {
            ...this.finalData,
            ...this.CompanyInformationComponent.model.companyForm.value,
            ...this.CompanyInformationComponent.model.partnerForm.value
          };
        }
        break;
      case 3:
        if (this.AttachmentsMembershipComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            documents: this.AttachmentsMembershipComponent.model.attachments,
            // documents: []
          };
          console.log("this.finaldata",this.finalData);
          
          this.perpareViewData();
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
    //check draft to patch value
      this.finalData={
        ...this.LicenseInfoComponent.model.licenseForm.value,
        ...this.CompanyInformationComponent.model.companyForm.value,
        ...this.CompanyInformationComponent.model.partnerForm.value,
        documents: this.AttachmentsMembershipComponent.model.attachments,
      }
    
    const partenerArrayData = this.CompanyInformationComponent.model.partners
    let partenerData = []
    //have to improve
    partenerData = partenerArrayData.map(ele => {
      return {
        partnerName: {
          partnerArabicName: ele?.partnerNameArabic,
          partnerEnglishName: ele?.partnerNameEnglish
        },
        typeOfRelation: {
          id: ele?.typeRelationShip,
          name: this.CompanyInformationComponent.model.relationTypes.filter(type=>{return type.id==ele?.typeRelationShip})[0]?.name
        },
        ownershipPercent: ele?.ownershipPercent,
        passportNumber: ele?.passportNumber,
        emiratesID: ele?.emiratesID,
        residenceNumber: ele?.residenceNumber,
        nationality: {
          id: ele?.nationality,
          name: this.CompanyInformationComponent.model.nationalities.filter(nationality=>{return nationality.id==ele?.nationality})[0]?.name
        },
        jobTitle: {
          id: ele?.jobTitle,
          name: this.CompanyInformationComponent.model.jobTitils.filter(title=>{return title.id==ele?.jobTitle})[0]?.name
        },
        partnerID: ele?.partnerID,
      }
    })
   

    const apiPath = APIs.membership.creatRequest + isDraft;
    this.apiSer
      .post(apiPath, {
        ...this.finalDataToSend(partenerData)
      })
      .pipe(takeUntil(this.endSub$))
      .subscribe({
        next: (res) => {
          console.log("res", res) 
          if (!res.isError) {
            this.activeStep = this.activeStep + 1
            this.requestId=res.result.id;
            this.hideActions = true;
            //this.requestId = res.company as any
            // this._router.navigate(['/services/companys/add-company/success/']);
          }
        },
        error: () => {
          this.snakSer.snack(
            this.translateSer.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }

  //findal data to send
  finalDataToSend(partenterData:any){
    const finalObjectToSend = {
      companyInfo: {
        companyArabicName: this.finalData?.companyArabicName,
        companyEnglishName: this.finalData?.companyEnglishName,
        parentCompany: {
          id: this.finalData?.parentCompany?? "",
          name: this.CompanyInformationComponent.model.myCompanies.filter(company=>{return company.id==this.finalData?.parentCompany})[0]?.name
        },
        companyPhonenumber: this.finalData?.companyPhonenumber?.e164Number,
        companyEmailAddress: this.finalData?.companyEmailAddress,
        companyNationality: {
          id: this.finalData?.companyNationality,
          name: this.CompanyInformationComponent.model.nationalities.filter(nationality=>{return nationality.id==this.finalData?.companyNationality})[0]?.name
        },
        activitys: this.CompanyInformationComponent.model.selectedActivities,
        specialActivitys: this.CompanyInformationComponent.model.selectedSpecialActivities,
        companyStreetAddress: this.finalData?.companyStreetAddress,
        companyPostalCode: this.finalData?.companyPostalCode,
        legalStatus: {
          id: this.finalData?.legalStatus,
          name: this.CompanyInformationComponent.model.legalStatuses.filter(status=>{return status.id==this.finalData?.legalStatus})[0]?.name
        },
        makaniNumber: this.finalData?.makaniNumber,
        faxNumber: this.finalData?.faxNumber,
        buildingNumber: this.finalData?.buildingNumber,
        streetAddress: this.finalData?.streetAddress,
      },
      licenseInfo: {
        licenseExpiryDate: this.finalData?.licenseExpiryDate,
        membershipDuration: + this.finalData?.membershipDuration,
        firmType: {
          id: this.finalData?.firmType
        },
        licenseNumber: +this.finalData?.licenseNumber,
        licenseType: {
          id: this.finalData?.licenseType,
          name: this.CompanyInformationComponent.model.licenseTypes.filter(type=>{return type.id==this.finalData?.licenseType})[0]?.name
        },
        licenseCategory: {
          id: this.finalData?.licenseCategory,
          name: this.CompanyInformationComponent.model.licenseCategories.filter(category=>{return category.id==this.finalData?.licenseCategory})[0]?.name
        },
        licenseIssueDate: this.finalData?.licenseIssueDate,
        licenseNationality: {
          id: this.finalData?.licenseNationality,
          name: this.CompanyInformationComponent.model.licenseNationalities.filter(nationality=>{return nationality.id==this.finalData?.licenseNationality})[0]?.name
        },
        poBox: this.finalData?.poBox,
        issueAuthority: {
          id: this.finalData?.issueAuthority,
          name: this.CompanyInformationComponent.model.authorities.filter(authority=>{return authority.id==this.finalData?.issueAuthority})[0]?.name
        },
        licenseIssuer: {
          id: this.finalData?.licenseIssuer,
          name: this.CompanyInformationComponent.model.issuers.filter(issuer=>{return issuer.id==this.finalData?.licenseIssuer})[0]?.name
        },
        commercialRN: this.finalData?.commercialRN ?? null,
        commercialRegisterationtype: {
          id: this.finalData?.commercialRegisterationtype,
          name: this.CompanyInformationComponent.model.commercialRegistrationTypes.filter(type=>{return type.id==this.finalData?.commercialRegistrationType})[0]?.name
        }
      },
      partnerInfo: partenterData,
      documents: this.AttachmentsMembershipComponent.model.attachments
    }

    return  finalObjectToSend
  }

  cancel(){
    this._router.navigate(['/services']);
  }

  public perpareViewData() {
    this.viewCompanyData = [
      {
        title: this.translateSer.instant("memberShipsModule.license.companyNameArabic"),
        data: this.LicenseInfoComponent.model.licenseForm.value["companyArabicName"]
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.companyNameEnglish"),
        data: this.LicenseInfoComponent.model.licenseForm.value["companyEnglishName"]
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.licenseExpirtyDate"),
        data: this.LicenseInfoComponent.model.licenseForm.value["licenseExpiryDate"]?.split("T")[0]
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.membershipDuration"),
        data: this.LicenseInfoComponent.model.licenseForm.value["membershipDuration"]==1 ? this.translateSer.instant("memberShipsModule.license.yearly") : this.translateSer.instant("memberShipsModule.license.sameAsLicenseValidity")
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.legalStatus"),
        data: this.CompanyInformationComponent.model.legalStatuses.filter(status => {
          return status.id == this.CompanyInformationComponent.model.companyForm.value["legalStatus"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.firmType"),
        data: this.CompanyInformationComponent.model.companyForm.value["firmType"] ? this.translateSer.instant("memberShipsModule.companyInformation.parentCompany") : this.translateSer.instant("memberShipsModule.license.branch")
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.parentCompany"),
        data: this.CompanyInformationComponent.model.myCompanies.filter(company => {
          return company.id == this.CompanyInformationComponent.model.companyForm.value["parentCompany"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.commercialRegistrationNumber"),
        data: this.CompanyInformationComponent.model.companyForm.value["commercialRN"]
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.phoneNumber"),
        data: this.CompanyInformationComponent.model.companyForm.value["companyPhonenumber"]?.internationalNumber
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.email"),
        data: this.CompanyInformationComponent.model.companyForm.value["companyEmailAddress"]
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.nationality"),
        data: this.CompanyInformationComponent.model.nationalities.filter(nationality => {
          return nationality.id == this.CompanyInformationComponent.model.companyForm.value["companyNationality"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.commercialRegistrationType"),
        data: this.CompanyInformationComponent.model.commercialRegistrationTypes.filter(type => {
          return type.id == this.CompanyInformationComponent.model.companyForm.value["commercialRegisterationtype"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseType"),
        data: this.CompanyInformationComponent.model.licenseTypes.filter(type => {
          return type.id == this.CompanyInformationComponent.model.companyForm.value["licenseType"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseCategory"),
        data: this.CompanyInformationComponent.model.licenseCategories.filter(category => {
          return category.id == this.CompanyInformationComponent.model.companyForm.value["licenseCategory"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseIssueDate"),
        data: this.CompanyInformationComponent.model.companyForm.value["licenseIssueDate"]?.split("T")[0]
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseNationality"),
        data: this.CompanyInformationComponent.model.licenseNationalities.filter(nationality => {
          return nationality.id == this.CompanyInformationComponent.model.companyForm.value["licenseNationality"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.faxNumber"),
        data: this.CompanyInformationComponent.model.companyForm.value["faxNumber"]
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.POBOX"),
        data: this.CompanyInformationComponent.model.companyForm.value["poBox"]
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.buildingNumber"),
        data: this.CompanyInformationComponent.model.companyForm.value["buildingNumber"]
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.streetAddress"),
        data: this.CompanyInformationComponent.model.companyForm.value["companyStreetAddress"]
      },
      // {
      //   title: this.translateSer.instant("memberShipsModule.companyInformation.issuingAuthority"),
      //   data: this.CompanyInformationComponent.model.authorities.filter(authority => {
      //     return authority.id == this.CompanyInformationComponent.model.companyForm.value["issuingAuthority"]
      //   })[0].name
      // },
       {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenceIssuer"),
        data: this.CompanyInformationComponent.model.issuers.filter(issuer => {
          return issuer.id == this.CompanyInformationComponent.model.companyForm.value["licenseIssuer"]
        })[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.makaniNumber"),
        data: this.CompanyInformationComponent.model.companyForm.value["makaniNumber"]
      }
    ];
    if (this.LicenseInfoComponent.model.licenseForm.value["issueAuthority"] && this.LicenseInfoComponent.model.licenseForm.value["licenseNumber"]) {
      this.viewCompanyData.push({
        title: this.translateSer.instant("memberShipsModule.license.issuingAuthority"),
        data: this.LicenseInfoComponent.model.authorities.filter(authority => {
          return authority.id == this.LicenseInfoComponent.model.licenseForm.value["issueAuthority"]
        })[0]?.name
      });
      this.viewCompanyData.push({
        title: this.translateSer.instant("memberShipsModule.license.licenseNumber"),
        data: this.LicenseInfoComponent.model.licenseForm.value["licenseNumber"]
      });
    }
    
    this.viewPartnersData=[]
    this.CompanyInformationComponent.model.partners.forEach(partner => {
      this.viewPartnersData.push({
        partnerNameEnglish: partner.partnerNameEnglish,
        partnerNameArabic: partner.partnerNameArabic,
        typeRelationShip: this.CompanyInformationComponent.model.getSelectedRelationship(partner.typeRelationShip),
        ownershipPercent: partner.ownershipPercent,
        passportNumber: partner.passportNumber,
        emiratesID: partner.emiratesID,
        residenceNumber: partner.residenceNumber,
        nationality: this.CompanyInformationComponent.model.getSelectedNationality(partner.nationality),
        jobTitle: this.CompanyInformationComponent.model.getSelectedJobTitle(partner.jobTitle),
        partnerID: partner.partnerID
      })
    });
    this.viewAttachmentsData=this.AttachmentsMembershipComponent.model.attachments;
    console.log(this.AttachmentsMembershipComponent.model.attachments);
  }

  public endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }
}
