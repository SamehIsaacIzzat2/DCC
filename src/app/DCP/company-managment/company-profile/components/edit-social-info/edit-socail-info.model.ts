import { CompanyService } from './../../services/company.service';
import { compSocialInfo, companyInterface } from './../../interfaces/company.interface';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { editCompState } from 'src/app/profile/Enums/edit-components.enum';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditSocailCompanyInformationModel {
  //=====================Data=========================
  public socialInformationForm: FormGroup;
  public submitted = false;
  private endSub$ = new Subject();
  public sendEvent: EventEmitter<compSocialInfo | null> = new EventEmitter();
  public nationalities: any[];
  public currentImage: string = '';
  public stateMode: editCompState = 1;
  public jobTitles = [{ id: "1", name: "bla bla" }];
  public pattren: string = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";
  currentData: companyInterface;
  constructor(
    private fb: FormBuilder,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private compSer:CompanyService,
    private _location: Location,
    private translate:TranslateService
  ) {
    this.initForm();
  }

  // init data in form
  initForm() {
    this.socialInformationForm = this.fb.group({
      // contactOwner: [null, Validators.required],
      // contactCreator: [null, Validators.required],
      // nationalityId: [null, Validators.required],
      // jobTitle: [null, Validators.required],
      website: [null, [Validators.pattern(this.pattren)]],
      linkedIn: [null, [Validators.pattern(this.pattren)]],
      faceBook: [null, [Validators.pattern(this.pattren)]],
      insta: [null, [Validators.pattern(this.pattren)]],
      twitter: [null, [Validators.pattern(this.pattren)]],
      others: [null, [Validators.pattern(this.pattren)]],
    });
  }
  // get All Look up feilds
  getSelectData() {
    if (this.stateMode !== editCompState.SteeperStatte) this.setValues();
    this.apiSer.get(APIs.lookups.nationalities).subscribe(
      (res) =>{
          if(!res.isError){
              this.nationalities = res.result;
          }
      });
  }
  // set intial data
  setValues() {
    this.compSer.companyDetails$
      .pipe(takeUntil(this.endSub$))
      .subscribe((companyProfile: companyInterface | null) => {
        if (companyProfile) {
          this.currentData = companyProfile;
          const generalInfo: compSocialInfo = companyProfile.socialAndOtherInfo;
          this.f['website'].setValue(generalInfo.website);
          this.f['linkedIn'].setValue(generalInfo.linkedIn);
          this.f['faceBook'].setValue(generalInfo.faceBook);
          this.f['insta'].setValue(generalInfo.insta);
          this.f['twitter'].setValue(generalInfo.twitter);
          this.f['others'].setValue(generalInfo.others);
        }
      });
  }

  //=======================Logic========================
  get f(): { [key: string]: AbstractControl } {
    return this.socialInformationForm.controls;
  }



  saveUpdate() {
    this.submitted = true;
    if (this.socialInformationForm.invalid) return;
    const submittedData: compSocialInfo = this.socialInformationForm.value;
    if (this.stateMode === editCompState.EditSectionState) {
      const apiPath = `${APIs.Companys.editSocialInfo}/${this.currentData.id}`;
      this.apiSer
        .put(apiPath, submittedData)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: (res) => {
            if (!res.isError && res.result && res.result.isSuccedded) {
              this.snakSer.snack('Info Updated Successfully');
              this.compSer.companyDetails$.next({
                ...this.currentData,
                socialAndOtherInfo: submittedData
              });
              this._location.back();
            }
          },
          error: () => {
            this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))
          }
        });
    } else {
      this.sendEvent.emit(submittedData)
    }

  }

  public endsubs() {
    this.endSub$.next("");
    this.endSub$.complete()
  }
}
