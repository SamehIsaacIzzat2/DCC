import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';

@Injectable()
export class OpportunityLeadModel {
  public id: string = '';
  endSub$ = new Subject();
  item: any;
  loading: boolean = true;
  leadApportunityForm: any;

  constructor(
    private apiSer: APICallerService,
    private formBuilder: FormBuilder,
    private route: Router,
    private snakSer: SnackService,
    private translate:TranslateService
  
  ) {
    this.initForm();

    let URL = route.url;
    let URL_AS_LIST = URL.split('/');
    this.id = URL_AS_LIST[4];
    this.getData(this.id);
  }

  //*********************************Logic**************************************** */
  get f(): { [key: string]: AbstractControl } {
    return this.leadApportunityForm.controls;
  }
  getData(id: string) {
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.leadOpportunity + '/' + id;
    const mycompanys$ = this.apiSer
      .get(mycompanys, false)
      .pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details]) => {
        this.apiSer.hideLoader();
        if (!details.isError) {
          const result = details.result;

          this.loading = false;

          this.item = {
            OpportuniyNumber: result[0]?.opportunityNumber,
            id: result[0]?.id,

            createdOn: result[0]?.createdOn,
            status: result[0]?.oportunityStatus,
            statusName: result[0]?.opportunityStatusName,
            notes: result[0]?.notes,
          };
          this.f['note'].setValue(this.item.notes);
        }
      });
  }

  closeOpportunity(id: string, issuccess: boolean, notes: string) {
    if (id == undefined || id == null) {
      this.snakSer.snack(this.translate.instant('opportunitiesModule.opportunitiesInfo.noOpportunity'));
      return;
    } else if (notes == null || notes == '') {
      this.snakSer.snack(this.translate.instant('opportunitiesModule.opportunitiesInfo.enterNote'));
      return;
    }
    this.apiSer.showLoader();
    let mycompanys = APIs.leads.submitOpportunity + '/' + id;
    const mycompanys$ = this.apiSer
      .post(
        mycompanys,
        {
          notes: notes,
          isSucceed: issuccess,
        },
        false
      )
      .pipe(takeUntil(this.endSub$));

    combineLatest([mycompanys$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([details]) => {
        this.apiSer.hideLoader();
        if (!details.isError) {
          this.snakSer.snack('Opportunity Submitted ');
          window.location.reload();
          //this.route.navigate(['leads/leadDetails/'+this.id+'/opportunity']);
          //this.getData(this.id);
        }
      });
  }

  initForm() {
    this.leadApportunityForm = this.formBuilder.group({
      note: [null],
    });
  }
}
