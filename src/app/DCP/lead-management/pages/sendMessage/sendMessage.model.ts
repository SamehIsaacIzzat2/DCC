import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';

@Injectable()
export class SendMessageModel {
  public banner: iBanner = {} as iBanner;

  public form: FormGroup;
  public isSubmitted: boolean;
  public id: string;
  public showResult:boolean=false;

  constructor(
    private fb: FormBuilder,
    public routeActive: ActivatedRoute,
    private apiCaller: APICallerService,
    private translateSer: TranslateService,
    private router: Router,
    private translate:TranslateService
  ) {
    this.routeActive.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

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

  }

  private initForm() {
    this.form = this.fb.group({
      title: [null],
      description: [null, Validators.required],
    });
  }

  public send() {
    let description = this.form.controls["description"].value;
    this.form.controls["description"].setValue(description.replaceAll('\n','<br>'));
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    let apiPath = "";
    if (this.router.url.indexOf('opportunities') == -1 ) {
      apiPath =  APIs.leads.sendMessage + this.id;
    }
    else
    {
      apiPath =  APIs.leads.sendMessageByOpportunity + this.id;
    }
    this.apiCaller.post(apiPath, this.form.value).subscribe((res) => {
      if (!res.isError) {
        this.isSubmitted = false;
        this.showResult=true;
        this.form.reset();

      }
    });
  }
}
