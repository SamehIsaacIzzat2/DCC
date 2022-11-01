import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LicenseInfoComponent } from '../../components/license-info/license-info.component';
import { CompanyInformationComponent } from '../../components/company-information/company-information.component';
import { AttachmentsMembershipComponent } from '../../components/attachments-membership/attachments-membership.component';
import { NewMembershipModel } from './new-membership-page.model';
import { ActivatedRoute } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';


@Component({
  selector: 'new-membership-company-page',
  templateUrl: './new-membership-page.component.html',
  styleUrls: ['./new-membership-page.component.scss'],
  providers: [NewMembershipModel],
})
export class NewMemberShipPageComponent implements OnInit, AfterViewInit {
  @ViewChild(LicenseInfoComponent) licenseInfoComponent: LicenseInfoComponent;
  @ViewChild(CompanyInformationComponent) CompanyInformationComponent: CompanyInformationComponent;
  @ViewChild(AttachmentsMembershipComponent) AttachmentsMembershipComponent: AttachmentsMembershipComponent;
  constructor(public model: NewMembershipModel, private activateRouter:ActivatedRoute,  private apiSer: APICallerService,) {}
  ngAfterViewInit(): void {
    this.model.LicenseInfoComponent = this.licenseInfoComponent;
    this.model.CompanyInformationComponent = this.CompanyInformationComponent;
    this.model.AttachmentsMembershipComponent = this.AttachmentsMembershipComponent;
  }

  ngOnInit(): void {
   this.activateRouter.params.subscribe(res=>{
      if(/\d/.test(`${res.id}`)){
       this.apiSer.get( APIs.membership.requestDetails+ '/' + res.id).subscribe(res=>{
        this.licenseInfoComponent.model.verified=true
        let sperateResult={...res.result.companyInfo, ...res.result.licenseInfo}
        this.CompanyInformationComponent.model.selectedActivities=sperateResult.activitys
        this.CompanyInformationComponent.model.selectedSpecialActivities=sperateResult.specialActivitys
        this.setDataToPartener(res.result.partnerInfo)

        this.AttachmentsMembershipComponent.model.attachments=res.result.documents 

        Object.entries(sperateResult).forEach(([key, value]: [string, any]) =>{
          if(value.id === null){
            this.CompanyInformationComponent.model.companyForm.controls[key]?.setValue("")
            this.licenseInfoComponent.model.licenseForm.controls[key]?.setValue("") 
          }else{
            this.CompanyInformationComponent.model.companyForm.controls[key]?.setValue(value?.id ?? value)
            this.licenseInfoComponent.model.licenseForm.controls[key]?.setValue(value?.id ?? value) 
          }
        });
        this.model.activeStep=3
        this.model.nextStep()
       })
      }
    })
  }


  //set data to partener
  setDataToPartener(data:any){
     this.CompanyInformationComponent.model.partners=data.map((ele:any)=>{
      this.CompanyInformationComponent.model.validatePercentage(ele.ownershipPercent)
       return{
        partnerNameEnglish:ele.partnerName.partnerEnglishName,
        typeRelationShip:ele.typeOfRelation.id,
        ownershipPercent:ele.ownershipPercent,
        nationality: ele.nationality.id,
        jobTitle:ele.jobTitle.id,
        emiratesID:ele.emiratesID,
        partnerID:ele.partnerID,
        partnerNameArabic:ele.partnerName.partnerArabicName,
        passportNumber:ele.passportNumber,
        residenceNumber:ele.residenceNumber,
       }
     })
  }

}




