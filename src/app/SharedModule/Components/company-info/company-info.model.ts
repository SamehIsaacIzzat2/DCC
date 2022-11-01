import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "../banner/banner.interface";
import { IcompanyInfo } from "./interfaces";

@Injectable()
export class CompanyInfoModel {

  // ************************************Data*******************************************/
  public itemcompany: IcompanyInfo = {} as IcompanyInfo;
  public requestitem: any = {};
  public requestId: string = '';
  public leadId: string = '';
  banner: iBanner = {} as iBanner;


  constructor(private route: ActivatedRoute, private apiSer: APICallerService, private router: Router, private translateSer:TranslateService) {

    // catch company Id
    let companyId = this.route.snapshot.paramMap.get("companyId");
    if (companyId) {
      this.showDetailsCompany(companyId);
    }

    // catch request Id ,lead Id
    this.route.params.subscribe((params: Params) => {
      console.log(params)

      const requestId = params['requestId'];
      const leadId=params['leadId']

      if (requestId) {
        this.requestId = requestId;

        this.showRequestDetails(requestId);
      }
      if(leadId){
        this.leadId = leadId;

      }

    });

    // fill banner data according the component that need to display company info

    if (this.router.url.includes('leads')) {
      this.banner = {
        title: "Company information",
        breadCrump: [
          { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/requests' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leadDetails'), link: '/dic/services/leads/leadDetails/' + this.leadId },
        ],
      }


    } else if (this.router.url.includes('requests')){
      this.banner = {
        title: "Company information",
        breadCrump: [
          { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dcc/services' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.requests'), link: '/dcc/services/requests' },
          { title: this.translateSer.instant('reqestModule.requestDetails.banner.title'), link: '/dcc/services/requests/requestDetails/' + this.requestId },
        ],
      }


    }
  }
    // ************************************Logic*******************************************/
    showDetailsCompany(id: string){
      let apiPathGetCompanyDetails = APIs.requests.requestCompanyDetails
      this.apiSer.get(apiPathGetCompanyDetails + "/" + id).subscribe(result => {
        console.log("this is result to show details", result);

        this.itemcompany.Activities = result.result.activitiesNames;
        this.itemcompany.CompanyName = result.result.name;
        this.itemcompany.CompanySize = result.result.size;
        this.itemcompany.Products = result.result.productsNames;
        this.itemcompany.industries = result.result.industries;
        this.itemcompany.countries = result.result.countries;
        this.itemcompany.cities = result.result.cities;
        this.itemcompany.companyLocation = result.result.locations;
      });





    }

    showRequestDetails(id: string){
      const requestApi = APIs.requests.getDetails + "/" + id;

      this, this.apiSer.get(requestApi).subscribe(
        (res) => {
          if (!res.isError) {
            console.log(res)
            this.requestitem = {
              requestId: res.result.id,
              requestNumber: res.result.requestNumber,
              requestTitle: res.result.requestType,
              serviceTypeName: res.result.serviceTypeName,
              status: res.result.status,
              statusName: res.result.statusName,
              created: res.result.created,

            };
          }

        }
      )
    }




  }
