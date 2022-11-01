import { Component, Input, OnInit,ViewChild,ElementRef,ViewChildren,QueryList,Sanitizer } from '@angular/core';
import { DetailsItem } from './interface';
import { FormModalService } from '../../../../SharedModule/Components/form-modal/form-modal.service';
import { ActivatedRoute, Params } from "@angular/router";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from './../../../../SharedModule/Services/lookup.service';
import { lookupInterfcae } from './../../../../SharedModule/Interfaces/lookup.interface';
import { takeUntil,Subject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  @ViewChildren('download') download: QueryList<ElementRef>;

  //***************************************Inputs and outputs***************************************** */
  endSub$ = new Subject();
  @Input() title:any
  @Input() hideParteners:boolean=false
  @Input() items:DetailsItem[]=[];
  @Input() partners:any[]=[];
  @Input() attachments:any[]=[];

  public loading:boolean=true;
  public detailsFlag:boolean=false;
  public requestId=-1;

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
  public commercialRegisterationtypes:lookupInterfcae[]=[];

  public selectedPartner = {
    partnerNameEnglish : '',
    partnerNameArabic : '',
    typeRelationShip : '',
    ownershipPercent : '',
    passportNumber : '',
    emiratesID : '',
    residenceNumber : '',
    nationality : '',
    jobTitle : '',
    partnerID : ''
  };

  constructor(private modalService: FormModalService,public translateSer: TranslateService, public apiSer: APICallerService ,private activeRoute:ActivatedRoute,private lookupService: LookupService,public _sanitizer: DomSanitizer) { 
    

  }

  ngOnInit(): void {
  
    this.activeRoute.parent?.params.subscribe((params: Params) => {
      console.log(params)
      const id = params['membershipId'];
      if(id){
        this.requestId=id;
        this.detailsFlag=true;
        this.getMemberShipDetails(id);
        this.getSelectData();
      }
    });
  }


  public viewPartner(index:number){
    this.selectedPartner = this.partners[index];
    this.modalService.show('showPartner');
  }

  private getMemberShipDetails(id:number){
    this.apiSer.get(APIs.membership.requestDetails + "/" + id).subscribe((res) => {
      if (!res.isError) {
        this.loading=false;
          console.log(res.result);
          this.perpareViewData(res.result);
      }
    });
  }

  public perpareViewData(data:any) {
    this.items = [
      {
        title: this.translateSer.instant("memberShipsModule.license.companyNameArabic"),
        data: data.companyInfo.companyArabicName
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.companyNameEnglish"),
        data: data.companyInfo.companyEnglishName
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.licenseExpirtyDate"),
        data: data.licenseInfo.licenseExpiryDate ? data.licenseInfo.licenseExpiryDate.split("T")[0] : ''
      },
      {
        title: this.translateSer.instant("memberShipsModule.license.membershipDuration"),
        data: data.licenseInfo.membershipDuration ? this.translateSer.instant("memberShipsModule.license.yearly") : this.translateSer.instant("memberShipsModule.license.sameAsLicenseValidity")
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.legalStatus"),
        data: this.legalStatuses.filter(status=>{return status.id==data.companyInfo.legalStatus?.id})[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.firmType"),
        data: data.licenseInfo.firmType ? this.translateSer.instant("memberShipsModule.companyInformation.parentCompany") : this.translateSer.instant("memberShipsModule.license.branch")
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.parentCompany"),
        data: data.companyInfo.parentCompany?.name
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.phoneNumber"),
        data: data.companyInfo.companyPhonenumber
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.email"),
        data: data.companyInfo.companyEmailAddress
      }, {
        title: this.translateSer.instant("shared.generalWord.company") + " " + this.translateSer.instant("shared.generalFeilds.nationality"),
        data: this.nationalities.filter(nationality=>{return nationality.id==data.companyInfo.companyNationality?.id})[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseType"),
        data: this.licenseTypes.filter(type=>{return type.id==data.licenseInfo.licenseType?.id})[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseCategory"),
        data: this.licenseCategories.filter(category=>{return category.id==data.licenseInfo.licenseCategory?.id})[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseIssueDate"),
        data: data.licenseInfo.licenseIssueDate?data.licenseInfo.licenseIssueDate.split("T")[0]:''
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseNationality"),
        data: this.licenseNationalities.filter(nationality=>{return nationality.id==data.licenseInfo.licenseNationality?.id})[0]?.name
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.faxNumber"),
        data: data.companyInfo.faxNumber
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.buildingNumber"),
        data: data.companyInfo.buildingNumber
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.streetAddress"),
        data: data.companyInfo.streetAddress
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.issuingAuthority"),
        data: this.authorities.filter(authority=>{return authority.id==data.licenseInfo.issueAuthority?.id})[0]?.name 
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenceIssuer"),
        data: this.issuers.filter(issuer=>{return issuer.id==data.licenseInfo.licenseIssuer?.id})[0]?.name
      },{
        title: this.translateSer.instant("memberShipsModule.companyInformation.licenseNumber"),
        data: data.licenseInfo.licenseNumber
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.makaniNumber"),
        data: data.companyInfo.makaniNumber
      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.commercialRegistrationType"),
        data:this.commercialRegisterationtypes.filter(type=>{return type.id==data.licenseInfo.commercialRegisterationtype.id})[0]?.name
    

      }, {
        title: this.translateSer.instant("memberShipsModule.companyInformation.POBOX"),
        data: data.licenseInfo.poBox
      }
    ];

    if(data.companyInfo.activitys.length > 0){
      this.items.push({
        title : this.translateSer.instant("shared.generalFeilds.activities"),
        data : data.companyInfo.activitys
      })
    }

    if(data.companyInfo.specialActivitys.length > 0){
      this.items.push({
        title : this.translateSer.instant("shared.generalWord.special") + " " + this.translateSer.instant("shared.generalFeilds.activities"),
        data : data.companyInfo.specialActivitys
      })
    }

    data.partnerInfo.forEach((partner:any) => {
      this.partners.push({
        partnerNameEnglish: partner.partnerName.partnerEnglishName,
        partnerNameArabic: partner.partnerName.partnerArabicName,
        typeRelationShip: this.relationTypes.filter(type=>{return type.id==partner.typeOfRelation.id})[0]?.name ,
        ownershipPercent: partner.ownershipPercent,
        passportNumber: partner.passportNumber,
        emiratesID: partner.emiratesID,
        residenceNumber: partner.residenceNumber,
        nationality: this.nationalities.filter(nationality=>{return nationality.id==partner.nationality.id})[0]?.name,
        jobTitle: this.jobTitils.filter(job=>{return job.id==partner.jobTitle.id})[0]?.name,
        partnerID: partner.partnerID
      })
    });
    this.attachments=data.documents;
    // data.documents.forEach((document:any) => {
    //   this.attachments.push({
    //     documentName:document.documentName,
    //     fileName:document.files[0].fileName,
    //     id:document.files[0].id,
    //     serverRelativeUrl:document.files[0].serverRelativeUrl,
    //   })
    // });
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
    
    const commercialRegisterationtype$ = this.lookupService.getcommercialRegisterTypes();
    commercialRegisterationtype$.pipe(takeUntil(this.endSub$)).subscribe((commercialRegisterationtype) => {
      this.commercialRegisterationtypes = commercialRegisterationtype;
    });
  }

  downloadDocument(id:string){
    this.download.forEach(element => {
      if(element.nativeElement.id==id)
        element.nativeElement.click();
    });
  }


}
