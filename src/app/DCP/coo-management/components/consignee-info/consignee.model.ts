import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { DetailsItem } from 'src/app/SharedModule/Components/generic-display-details/Interfaces';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { AddNewConsigneeComponent } from '../add-new-consignee/add-new-consignee.component';

@Injectable()
export class ConsigneeModel {
  //********************************Data****************************** */
  public consigneeForm: FormGroup;
  public submitted: boolean = false;
  public showConsigneeDetails: boolean = false;
  public showConsigneeForm: boolean = false;

  //********************************mock Data****************************** */

  public consigneeTypes: any[];
  public countries: any[];
  public cities: any[];

  consignees: any[];
  selectedConsignee: any={
    consigneeId: "",
    consigneeFirstname: "",
    consigneeLastname: "",
    consigneeType: "",
    phoneNumber: "",
    addressLine1: null,
    addressLine2: null,
    poBox: null,
    countryName: "",
    cityName: "",
    fax: null
  };
  get ConsigneeDetails(): DetailsItem[] {
    return [
      {
        title: this.translate.instant('cooModule.detailsData.consigneeName'),
        data: `${this.selectedConsignee.consigneeFirstname} ${this.selectedConsignee.consigneeLastname}`,
      },
      {
        title: this.translate.instant('cooModule.detailsData.consigneeType'),
        data: `${this.selectedConsignee.consigneeType}`,
      },
      {
        title: this.translate.instant('shared.generalFeilds.phoneNumber'),
        data: `${this.selectedConsignee.phoneNumber}`,
      },
      {
        title: this.translate.instant('cooModule.detailsData.addressLine1'),
        data: `${this.selectedConsignee.addressLine1}`,
      },
      {
        title: this.translate.instant('cooModule.detailsData.addressLine2'),
        data: `${this.selectedConsignee.addressLine2}`,
      },
      {
        title: this.translate.instant('cooModule.detailsData.pOBOX'),
        data: `${this.selectedConsignee.poBox}`,
      },
      {
        title: this.translate.instant('shared.generalFeilds.country'),
        data: `${this.selectedConsignee.countryName }`,
      },
      {
        title: this.translate.instant('shared.generalFeilds.city'),
        data: `${this.selectedConsignee.cityName }`,
      },
      {
        title: this.translate.instant('cooModule.detailsData.fax'),
        data: `${this.selectedConsignee.fax }`,
      },
    ];
  }
  public endSub$ = new Subject();

  AddNewConsigneeComponent: AddNewConsigneeComponent;

  //********************************constructor****************************** */
  constructor(
    private fb: FormBuilder,
    private snakSer: SnackService,
    private translate: TranslateService,
    private lookupSer: LookupService
  ) {
    this.initForm();
    this.getSelectData();

  }
  //********************************Logic****************************** */
  get f() {
    return this.consigneeForm.controls;
  }

  initForm() {
    this.consigneeForm = this.fb.group({
      consignee: ['', Validators.required],
    });
  }

  displayConsigneeDetails() {
    this.showConsigneeDetails = true;
    this.showConsigneeForm = false;
  }

  public showAddConsigneeForm() {
    this.showConsigneeForm = true;
    this.showConsigneeDetails = false;

    this.includeNewConsigneeForm();
  }

  includeNewConsigneeForm() {
    this.consigneeForm.addControl(
      'newConsignee',
      this.AddNewConsigneeComponent.model.consigneeForm
    );

    this.clearValidatorAndupdateValidity('consignee', this.consigneeForm);
  }

  excludeNewConsigneeForm() {
    this.consigneeForm.removeControl('newConsignee');

    this.setRequiredValidator('consignee', this.consigneeForm);
  }

  saveData() {
    this.submitted = true;
    if (this.consigneeForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return false;
    }
    return true;
  }

  onConsigneeChange(event: any) {

    const consigneeId = event.target.value;
    this.selectedConsignee = this.consignees.filter(
      (item) => item.consigneeId == consigneeId
    )[0];

    this.displayConsigneeDetails();

    this.excludeNewConsigneeForm();
  }

  clearValidatorAndupdateValidity(controlName: string, formGroup: FormGroup) {
    formGroup.controls[controlName]?.clearValidators();
    formGroup.controls[controlName]?.updateValueAndValidity();
  }

  setRequiredValidator(controlName: string, formGroup: FormGroup) {
    formGroup.controls[controlName].setValidators(Validators.required);
  }

  private getSelectData() {
    this.lookupSer
      .getConsignees()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.consignees = result;
      });
  }
}
