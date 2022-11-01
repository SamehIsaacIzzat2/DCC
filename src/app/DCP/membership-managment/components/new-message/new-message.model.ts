import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";

@Injectable()
export class NewMessageModel {

  //*************************************Data******************************************** */
  public requestId:string|null;
    public item:any;
    public banner: iBanner = {} as iBanner;

    public form: FormGroup;
    public isSubmitted: boolean;
    public id: string;
    public showResult:boolean=false;

    constructor(
      private fb: FormBuilder,
      private translateSer: TranslateService,
      private translate:TranslateService,
      private apiCaller:APICallerService,
      private activeRoute:ActivatedRoute
    ) {
      this.getMemberShipId();
      this.initForm();
  
      this.banner={
        title: this.translate.instant('leadsModule.messages.newMessage'),
        breadCrump: [
          { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/dic/services' },
          { title: this.translateSer.instant('bannerData.bannerNavigationLinks.leads'), link: '/dic/services/leads' },
          { title: this.translateSer.instant('leadsModule.leadsInfo.leadInformation'), link: '/dic/services/leads/leadDetails/'+this.id},
          { title: this.translateSer.instant('leadsModule.messages.messages'),link: '/dic/services/leads/leadDetails/'+this.id +'/messages' },
          { title: this.translateSer.instant('leadsModule.messages.newMessage') },
        ],
      }

      this.item= {
        icon: 'done',
        title: this.translateSer.instant("leadsModule.messages.yourMessageSentSuccessfully"),
        btnConfig: {
          text: this.translateSer.instant("leadsModule.messages.backToMessages"),
          url:`/dcc/services/memberships/request-details/${this.requestId}/request-messages`,
        }
      }
  
    }
    private getMemberShipId(){
      // get membership request  Id
      const id=this.activeRoute.snapshot.paramMap.get('id');
      if(id){
        this.requestId = id;
      }

  }
  
    private initForm() {
      this.form = this.fb.group({
        title: [null],
        description: [null, Validators.required],
      });
    }
  
    public send() {
      let apiPath = "";
      let description = this.form.controls["description"].value;
      this.form.controls["description"].setValue(description.replaceAll('\n','<br>'));
      this.isSubmitted = true;
      if (this.form.invalid) {
        return;
      }
     
      apiPath =  APIs.membership.sendMessage;
      console.log(this.form.value)
     
      this.apiCaller.post(apiPath +"/"+ this.requestId, this.form.value).subscribe((res) => {
        if (!res.isError) {
          this.isSubmitted = false;
          this.showResult=true;
          this.form.reset();
  
        }
      });
     
      
    }
}
