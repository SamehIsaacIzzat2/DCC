import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { Subject, takeUntil } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';

@Injectable()
export class ShipmentInfoModel {
  //********************************Data************************************ */
  public shipmentForm: FormGroup;
  public submitted: boolean = false;
  //********************************Mock data************************************ */
  public transportationModes: any[] = [
    { id: 121290000, name: 'Air' },
    { id: 121290001, name: 'Sea' },
    { id: 121290002, name: 'Fly' },
  ];
  public exporterTypes: any[] = [
    { id: 1, name: 'mode-1' },
    { id: 2, name: 'mode-2' },
    { id: 3, name: 'mode-3' },
    { id: 4, name: 'mode-4' },
  ];
  public exitPoints: any[];

  public dischargePorts: any[];
  public allCountries: any[] = [];
  public allCities: any[] = [];

  public Destinations: any[] = [
    { id: 1, name: 'mode-1' },
    { id: 2, name: 'mode-2' },
    { id: 3, name: 'mode-3' },
    { id: 4, name: 'mode-4' },
  ];
  public endSub$ = new Subject();
  //********************************constructor************************************ */
  constructor(
    private formBuilder: FormBuilder,
    private snakSer: SnackService,
    private lookupSer: LookupService,
    private translate: TranslateService,
    private apiSer: APICallerService
  ) {
    this.initForm();
    this.getSelectData();
  }
  //********************************Logic************************************ */
  get f() {
    return this.shipmentForm.controls;
  }

  initForm() {
    this.shipmentForm = this.formBuilder.group({
      transportationModeId: ['', [Validators.required]],
      // exporterTypeId:['',[Validators.required]],
      exitPointId: ['', [Validators.required]],
      dischargePortId: [''],
      departureDate: [''],
      destinationCountryId: ['', [Validators.required]],
      destinationCityId: ['', [Validators.required]],
      addtionalDetails: [''],
      printProductsInCOO: ['', [Validators.required]],
    });
  }

  saveData() {
    this.submitted = true;
    if (this.shipmentForm.invalid) {
      this.snakSer.snack(
        this.translate.instant('shared.generalWord.requiredData')
      );
      return false;
    }
    return true;
  }

  datePicker(event: any) {
    this.shipmentForm.controls['departureDate'].setValue(event);
  }

  private getSelectData() {
    this.lookupSer
      .getExistPoints()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.exitPoints = result;
      });

    this.lookupSer
      .getPortOfDischarges()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.dischargePorts = result;
      });

      this.lookupSer
      .getCountries()
      .pipe(takeUntil(this.endSub$))
      .subscribe((countriesRes) => {
        this.allCountries = countriesRes;
      });
  }
  public selectRelatedCities(data: any) {
    //to make sure user select country

    // this.selectContryFlag=true;
    let countryId = data.value;
    // call APi to return ralated city
    this.getCountryCities(countryId);
  }

  private getCountryCities(countries: any) {
    if (countries) {
      this.apiSer
        .get(APIs.lookups.citys + '/' + countries)
        .pipe(takeUntil(this.endSub$))
        .subscribe((res) => {
          if (!res.isError) {
            this.allCities = res.result;
          }
        });
    }
    this.allCities = [];
    return;
  }
}
