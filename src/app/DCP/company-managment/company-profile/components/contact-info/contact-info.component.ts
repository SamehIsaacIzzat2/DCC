import { compAddressInfo } from './../../interfaces/company.interface';
import { CompanyService } from './../../services/company.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { viewCompState } from 'src/app/profile/Enums/edit-components.enum';
import { companyInterface } from '../../interfaces/company.interface';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditContactCompanyInformationModel } from '../edit-contact-info/edit-contact-info.model';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  providers: [EditContactCompanyInformationModel]
})
export class ContactInfoComponent implements OnInit {
  @Input() stateMode: viewCompState = 1;
  //=========================Data=======================
  private endSub$ = new Subject();
  public contactData:compAddressInfo;
  countries: any[]=[];
  cities: any[]=[];
  cityName:string='';

  phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  constructor(private compSer: CompanyService, public lookupSer: LookupService,public model: EditContactCompanyInformationModel,private ApiSer:APICallerService) { }

  ngOnInit(): void {
    this.getCurrentCompany();
    this.getSelectData();
  }


  getCurrentCompany() {
    let obs$: BehaviorSubject<companyInterface | null>;
    this.getViewAndEditState()
      ? (obs$ = this.compSer.companyDetails$)
      : (obs$ = this.compSer.companyEditedDetails$);
    obs$
      .pipe(takeUntil(this.endSub$))
      .subscribe((company: companyInterface | null) => {
        if (company) {
          this.contactData = company.addressAndContactInfo;
          this.getCityName(this.contactData.cityId);
          this.phoneForm.controls.phone.setValue(this.contactData.phoneNumber);
          this.phoneForm.controls.phone.disable();
        }
      });
  }

  getSelectData() {
    const countries$ = this.lookupSer.getCountries();
    const cities$ = this.lookupSer.getCities();
    combineLatest([countries$, cities$])
      .pipe(takeUntil(this.endSub$))
      .subscribe(([countries, cities]) => {
        this.countries = countries;
        this.cities = cities;
      });
  }

  // Component states / modes
  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }

  
  // to handle city name without using getlookup function
  public getCityName(cityId: string | undefined) {
    if (cityId) {
      this.ApiSer.get(APIs.lookups.cities + "?Id=" + cityId).subscribe(cityData => {
        if (!cityData.isError) {
          this.cityName = cityData.result[0].name;
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete()
  }

}
