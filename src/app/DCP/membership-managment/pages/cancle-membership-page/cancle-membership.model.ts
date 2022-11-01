import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { validateIBAN } from "ngx-iban-validator";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { DetailsItem } from "src/app/SharedModule/Components/generic-display-details/Interfaces";

@Injectable()
export class CancleMembershipModel {
    //************************************Data*************************************** */
    public banner: iBanner = {
        breadCrump: [
          {
            title: this.translate.instant('bannerData.breadCrump.home'),
            link: '/services',
          },
          {
            title:this.translate.instant('memberShipsModule.documents.documents')
          }
          
        ],
        subbreadCrump: [],
        // title: this.translate.instant('bannerData.breadCrump.newMemberShip'),
      };

     public item: any = {
        icon: 'done',
        title:this.translate.instant('memberShipsModule.memberShiprequestDetails.cardTitle'),
        btnConfig: {
          text:this.translate.instant('reqestModule.createRequest.viewRequests'),
          url: "/requests",
        }
      }

      public myCompanies:any[];
      public ShowDetails:boolean=false;
      public comapnyDataForm:FormGroup;
      public banckAccountDataForm:FormGroup;
      public submitted:boolean=false;
      public detailsData:any={} as any;
      public items:DetailsItem[]=[];
      public companyId:string='';

    //************************************constructor*************************************** */

      constructor(private translate:TranslateService, private formBuilder:FormBuilder ,private router:Router,private apiSer:APICallerService){
        this.initForm();
        this.getMembershipCompanies();

      }

    //************************************Logic*************************************** */

    get f(): { [key: string]: AbstractControl } {
      return this.banckAccountDataForm.controls;
    }

    initForm(){

      this.comapnyDataForm=this.formBuilder.group({
        company: [null, Validators.required]
      })
     this.banckAccountDataForm=this.formBuilder.group({
      accountNumber: [null, Validators.required],
      bankName: [null, [Validators.required,]],
      // iBanNumber: [null, [Validators.required,validateIBAN]],
      iBanNumber: [null, [Validators.required]],
      refundWalletBallance:[null,Validators.required]
     })
    }

    getMembershipCompanies(){
      this.apiSer.get(APIs.Companys.getActiveWithMembership).subscribe((res)=>{
        if(!res.isError){
          this.myCompanies=res.result;
        }
      })
    }

    selectCompany(data:any){
      this.ShowDetails=true;
      this.companyId=data.target.value;
      this.getMemberShipDetails(data.target.value)
    }

    getMemberShipDetails(companyId:string){
      this.apiSer.get(APIs.membership.membershipDetails+"/"+companyId).subscribe((res)=>{
        if(!res.isError){
          console.log(res)
          this.detailsData={
            companyArabicName:res.result?.companyInfo?.companyArabicName,
            companyEnglishName:res.result?.companyInfo?.companyEnglishName,
            licenseNumber:res.result?.licenseInfo?.licenseNumber,
            issueAuthority:res.result?.licenseInfo?.issueAuthority?.name,
            licenseExpiryDate:moment(res.result?.licenseInfo?.licenseExpiryDate).format("YYYY-MM-DD")
          }

          this.items=[
            {
              title: this.translate.instant("memberShipsModule.companyInformation.issuingAuthority"),
              data: this.detailsData.issueAuthority,
             },
             {
              title:this.translate.instant("memberShipsModule.companyInformation.licenceNumber"),
              data:this.detailsData.licenseNumber,
             },
             {
              title:this.translate.instant("memberShipsModule.companyInformation.comapyNameInEnglish"),
              data:this.detailsData.companyEnglishName,
             },
             {
              title:this.translate.instant("memberShipsModule.companyInformation.companyNameArabic"),
              data:this.detailsData.companyArabicName,
             },
             {
              title:this.translate.instant("memberShipsModule.cancleMembership.expirtyDate"),
              data:this.detailsData.licenseExpiryDate,
             }
          ];

        }
      })


    }

    CancleMembership(){
      console.log(this.banckAccountDataForm);
      if(this.banckAccountDataForm.invalid) return;

      this.apiSer.post(APIs.membership.cancleMemberShip +'/' +this.companyId,this.banckAccountDataForm.value).subscribe((res)=>{
        if(!res.isError){
          this.submitted=true;
        }
      })
      



    }


}
