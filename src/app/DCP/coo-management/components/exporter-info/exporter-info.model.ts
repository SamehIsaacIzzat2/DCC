import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { companyInterface } from 'src/app/DCP/company-managment/company-profile/interfaces/company.interface';
import { DetailsItem } from 'src/app/SharedModule/Components/generic-display-details/Interfaces';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AddNewConsigneeComponent } from '../add-new-consignee/add-new-consignee.component';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class ExporterInfoModel {
  //********************************Data****************************** */
  public userCompanyForm: FormGroup;
  //********************************Mock Data****************************** */
  public usercompanies: any[];

  public exporterTypes: any[];
  public endSub$ = new Subject();
  get exporterDetails(): DetailsItem[] {
    return [
      {
        title: this.translate.instant('cooModule.detailsData.exporterName'),
        subTitle: this.translate.instant('cooModule.detailsData.english'),
        data: this.selectedCompany?.companyNameEnglish,
      },
      {
        title: this.translate.instant('cooModule.detailsData.exporterName'),
        subTitle: this.translate.instant('cooModule.detailsData.arabic'),
        data: this.selectedCompany?.companyNameArabic,
      },
      {
        title: this.translate.instant('shared.generalFeilds.country'),
        data: this.selectedCompany?.country,
      },
      {
        title: this.translate.instant('shared.generalFeilds.city'),
        data: this.selectedCompany?.city,
      },
      {
        title: this.translate.instant('shared.generalFeilds.phoneNumber'),
        data: this.selectedCompany?.phoneNumber,
      },
      {
        title: this.translate.instant('cooModule.detailsData.pOBOX'),
        data: this.selectedCompany?.poBox,
      },
      {
        title: this.translate.instant('cooModule.detailsData.fax'),
        data: this.selectedCompany?.fax,
      },
    ];
  }
  public submitted: boolean = false;
  public selectedCompany: any;

  //********************************constructor****************************** */
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private snakSer: SnackService,

    private lookupSer: LookupService
  ) {
    this.initForm();
    this.getSelectData();
  }
  //********************************logic****************************** */

  // Getters and Setters
  get f(): { [key: string]: AbstractControl } {
    return this.userCompanyForm.controls;
  }

  private initForm() {
    this.userCompanyForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      exporterType: [''],
    });
  }

  onCompanyChange(event: any) {

    const id = event.target.value;
    this.selectedCompany = this.usercompanies.filter(
      (item) => item.id == id
    )[0];

  }
  public selectExporterType() {
    console.log('exporter type selected');
  }

  saveData() {
    // return true;
    this.submitted = true;
    console.log('valid', this.userCompanyForm);
    if (this.userCompanyForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return false;
    }
    return true;
  }

  private getSelectData() {
    this.lookupSer
      .getExporterTypes()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.exporterTypes = result;
      });

    this.lookupSer
      .getCompaniesWithActiveMembership()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.usercompanies = result;
      });
  }
}
