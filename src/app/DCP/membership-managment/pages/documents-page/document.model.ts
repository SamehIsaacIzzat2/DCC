import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { DocumentDataModel } from "./Interfaces/Documnet";

@Injectable()
export class DocumentModel {


    
//*******************************Data****************************** */
public p:number=1;
public totalPages:number=0;
public banner: iBanner = {
  breadCrump: [
    {
      title: this.translateSer.instant('bannerData.breadCrump.home'),
      link: '/services',
    },
    {
      title:this.translateSer.instant('memberShipsModule.documents.documents')
    }
    
  ],
  subbreadCrump: [],
  // title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
};

public membershipActiveCompanies:any []=[]
public rowData:DocumentDataModel[]=[]
public displayedData:DocumentDataModel[]=[]
public loading:boolean=true;
public companyIds:string[]=[];
//*******************************Constractor****************************** */

constructor(private translateSer:TranslateService,private apiSer:APICallerService){

  // get comapny for filtration
  this.getUserCompany();

  // get all document list for the user
  this.getDocumentList();
}

//*********************************Logic***************************************** */
changePage(data:any){

this.totalPages=Math.ceil(this.rowData.length /5);
console.log(this.totalPages)
if(data > this.totalPages){
  this.p=this.totalPages;
  return;
}else if(data <= 0){
  this.p=1;
  return;

}else{
  this.p=data;
  return;
}
}

getUserCompany(){
  this.apiSer.get(APIs.Companys.getActiveWithMembership).subscribe((res)=>{
    if(!res.isError){
     this.membershipActiveCompanies=res.result;
    }
  })

}

getDocumentList(){
  this.apiSer.get(APIs.membership.documentList).subscribe((res)=>{
    if(!res.isError){
      this.loading=false;
      this.rowData=res.result;
      this.displayedData=this.rowData;
    }
  })
}

filterDocumentList(event:any,comapnyId:string){
  if ((event.srcElement as any).checked) {
    if(comapnyId ==='0'){
     this.displayedData=this.rowData;
     this.companyIds.push('0');
     return;
    }else{
    this.companyIds.push(comapnyId);
    }
  }else{ 
    this.companyIds=this.companyIds.filter((id)=>id !=comapnyId);
  }
  this.filter(this.companyIds);
}

filter(companyIDs:any[]){
  if(companyIDs.length == 1 && companyIDs[0]=='0' || companyIDs.length == 0){
    this.displayedData=this.rowData;
  }else{
    companyIDs.includes('0') ? this.displayedData=this.rowData : this.displayedData=this.rowData.filter((document)=>companyIDs.includes(document.companyId))
  }
}
}
