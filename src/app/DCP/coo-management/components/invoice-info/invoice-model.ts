import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { DetailsItem } from 'src/app/SharedModule/Components/generic-display-details/Interfaces';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { DateValidators } from 'src/app/SharedModule/validators/date-validators.service';

@Injectable()
export class InvoiceModel {
  public invoiceForm: FormGroup;
  public submitted: boolean = false;
  public invoiceIndex: any;
  currencies = [
    { id: 0, name: 'Egyptian bound' },
    { id: 1, name: 'Us dollar' },
  ];
  hsCodes: any[];
  unitsOfMeasures: any[];
  unitsOfMeasuresFiltered: any[];

  processTypes: any[];

  public countries: any[] = [];

  submittedProducts: any;
  // = [
  //   {
  //     id: 0,
  //     code: '345-Product',
  //     arName: 'Woden Door',
  //     enName: 'باب خشبي',
  //     country: 'Spain',
  //     countryId: '1',
  //     processTypeCountry: 'Spain, Initial',
  //     quantity: '15 Piece ',
  //     unit: '1',
  //     price: 'AED 20 ',
  //     totalPrice: 'AED 3,000 ',
  //     packages: [
  //       {
  //         id: 1,
  //         type: 'HS-Code-1',
  //         size: '345-Product',
  //         quantity: 'Quantity',
  //       },
  //       {
  //         id: 2,
  //         type: 'HS-Code-2',
  //         size: '345-Product',
  //         quantity: 'Quantity',
  //       },
  //     ],
  //   },
  // ];

  submittedData: any;

  public endSub$ = new Subject();

  get selectedHSCodeDetails(): DetailsItem[] {
    const items = [
      {
        title: this.translate.instant(
          'cooModule.invoiceInfo.productNameEn'
        ) as any,
        data: this.selectedHSCode?.hsCodesNameEnglish,
      },

      {
        title: this.translate.instant(
          'cooModule.invoiceInfo.productNameAr'
        ) as any,
        data: this.selectedHSCode?.hsCodesNameArabic,
      },
    ];
    return items;
  }

  selectedHSCode: any;

  constructor(
    private fb: FormBuilder,
    private snakSer: SnackService,
    private translate: TranslateService,
    private lookupSer: LookupService,
    private apiSer: APICallerService
  ) {
    this.initForm();
    this.getSelectData();
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      number: [null, Validators.required],
      date: [null,[ Validators.required,DateValidators.presentOrPast, DateValidators.notOlderThan(180)]],
      amount: [null, Validators.required],
      currency: [null, Validators.required],
      //product details
      products: this.fb.group({
        product: [null, Validators.required],
        quantity: [1, Validators.required],
        unit: [null, Validators.required],
        price: [null, Validators.required],
        country: [null, Validators.required],
        process: [null],
        comments: [null],
      }),
    });
    console.log(this.invoiceForm);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.invoiceForm.controls;
  }
  get productsForm(): { [key: string]: AbstractControl } {
    return (this.invoiceForm.controls['products'] as FormGroup).controls;
  }
  //onSubmit form
  onAddProduct() {
    this.submitted = true;
    this.addProductFormValidation();
    if (this.invoiceForm.invalid) {
      return;
    }

    if (!this.submittedProducts) {
      this.submittedProducts = [];
    }
    const formData = this.invoiceForm.value.products;
    const countryName = this.getCountryName(formData.country);
    this.submittedProducts.push({
      id: this.selectedHSCode.id,
      code: this.selectedHSCode.code,
      arName: this.selectedHSCode.hsCodesNameEnglish,
      enName: this.selectedHSCode.hsCodesNameArabic,
      country: countryName,
      countryId: formData.country,
      processTypeCountry: `${formData.process}, ${countryName}`,
      processType: formData.process,
      quantity: formData.quantity,
      unit: formData.unit,
      price: formData.price,
      totalPrice: `${formData.quantity * formData.price}`,
      packages: [],
    });
    this.clearProductForm();
    this.submitted = false;
  }

  //get product data
  productData(event: any) {
    console.log('index', this.invoiceIndex);

    console.log('event', event);
    this.submittedProducts[this.invoiceIndex].packages.push({
      ...event,
      id: this.submittedProducts[this.invoiceIndex].packages.length + 1,
    });
  }

  // delete package
  deletePackageFromProductPackages(event: any) {
    console.log('event', event);
    this.submittedProducts[event.index].packages.splice(event.productIndex, 1);
    // this.data[event.index].packages = this.data[event.index].packages.filter(
    //   (ele) => {
    //     console.log('ele', ele);
    //     return ele.id != event.id;
    //   }
    // );
  }

  saveData() {
    this.submitted = true;
    this.removeProductFormValidation();
    if (this.invoiceForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return false;
    }
    this.submittedData = {
      invoiceInfo: {
        number: this.invoiceForm.value.number,
        date: this.invoiceForm.value.date,
        amount: this.invoiceForm.value.amount,
        currency: this.invoiceForm.value.currency,
        products: this.submittedProducts,
      },
    };
    return true;
  }

  private getSelectData() {
    this.lookupSer
      .getCountries()
      .pipe(takeUntil(this.endSub$))
      .subscribe((countriesRes) => {
        this.countries = countriesRes;
      });

    this.lookupSer
      .getProcessTypes()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.processTypes = result;
      });

    this.lookupSer
      .getHsCodes()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.hsCodes = result;
      });

      this.lookupSer
      .getUnitsOfMeasures()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.unitsOfMeasures = result;
      });
  }

  datePicker(event: any) {
    this.invoiceForm.controls['date'].setValue(event);
  }

  public onHSCodeChange(event: any) {
    const selectedHSCodeId = event.target.value;
    this.selectedHSCode = this.hsCodes.filter(
      (code) => code.id == selectedHSCodeId
    )[0];

    this.unitsOfMeasuresFiltered = this.unitsOfMeasures.filter(code=> code.id== this.selectedHSCode.defaultuomidValueId);
  }

  clearProductForm() {
    this.selectedHSCode = null;

    this.invoiceForm.get('products.product')?.setValue(null);
    this.invoiceForm.get('products.quantity')?.setValue(1);
    this.invoiceForm.get('products.unit')?.setValue(1);
    this.invoiceForm.get('products.price')?.setValue(null);
    this.invoiceForm.get('products.country')?.setValue(null);
    this.invoiceForm.get('products.process')?.setValue(null);
    this.invoiceForm.get('products.comments')?.setValue(null);

    this.invoiceForm.updateValueAndValidity();
  }

  removeProductFormValidation() {
    this.clearValidatorAndupdateValidity('products.product', this.invoiceForm);
    this.clearValidatorAndupdateValidity('products.quantity', this.invoiceForm);
    this.clearValidatorAndupdateValidity('products.unit', this.invoiceForm);
    this.clearValidatorAndupdateValidity('products.price', this.invoiceForm);
    this.clearValidatorAndupdateValidity('products.country', this.invoiceForm);
  }

  addProductFormValidation() {
    this.setRequiredValidator('products.product', this.invoiceForm);
    this.setRequiredValidator('products.quantity', this.invoiceForm);
    this.setRequiredValidator('products.unit', this.invoiceForm);
    this.setRequiredValidator('products.price', this.invoiceForm);
    this.setRequiredValidator('products.country', this.invoiceForm);
  }

  clearValidatorAndupdateValidity(controlName: string, formGroup: FormGroup) {
    formGroup.get(controlName)?.clearValidators();
    formGroup.get(controlName)?.updateValueAndValidity();
  }

  setRequiredValidator(controlName: string, formGroup: FormGroup) {
    formGroup.get(controlName)?.setValidators(Validators.required);
  }

  getCountryName(id: string) {
    const name = this.countries.filter((c) => c.id == id)[0]?.name;

    return name;
  }
}
