import { lookupInterfcae } from './../Interfaces/lookup.interface';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from './../../CallerModule/Services/APICaller.service';
import { BehaviorSubject, map, tap, Observable, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  public lookups$ = {
    nationalities$: new BehaviorSubject(null),
    licenseNationalities$: new BehaviorSubject(null),
    industries$: new BehaviorSubject(null),
    titles$: new BehaviorSubject(null),
    countries$: new BehaviorSubject(null),
    cities$: new BehaviorSubject(null),
    interactionsType$: new BehaviorSubject(null),
    complaintTypes$: new BehaviorSubject(null),
    CompanySize$: new BehaviorSubject(null),
    sectors$: new BehaviorSubject(null),
    entityTypes$: new BehaviorSubject(null),
    anuualTurnover$: new BehaviorSubject(null),
    noOfEmplyees$: new BehaviorSubject(null),
    authorities$: new BehaviorSubject(null),
    legalStatuses$: new BehaviorSubject(null),
    licenseTypes$: new BehaviorSubject(null),
    licenseCategories$: new BehaviorSubject(null),
    licenseIssuers$: new BehaviorSubject(null),
    commercialRegisterTypes$: new BehaviorSubject(null),
    firmTypes$: new BehaviorSubject(null),
    activities$: new BehaviorSubject(null),
    specialActivities$: new BehaviorSubject(null),
    relationTypes$: new BehaviorSubject(null),
    myCompanies$: new BehaviorSubject(null),
     exporterTypes$: new BehaviorSubject(null),
      consigneeTypes$: new BehaviorSubject(null),
      consignees$: new BehaviorSubject(null),
      
      processTypes$: new BehaviorSubject(null),
      existPoints$: new BehaviorSubject(null),
      portOfDischarges$: new BehaviorSubject(null),
      hsCodes$: new BehaviorSubject(null),
      companiesWithActiveMembership$: new BehaviorSubject(null),
      packageTypes$: new BehaviorSubject(null),
      unitsOfMeasures$: new BehaviorSubject(null),
    services$: new BehaviorSubject(null),
    servicesTypes$: new BehaviorSubject(null),
    servicesFees$: new BehaviorSubject(null)
  };

  LOOKUPS_APIS = APIs.lookups;
  constructor(private apiSer: APICallerService) {}

  private getLookup(endpointUrl: string, subject: BehaviorSubject<any>) {
    return this.apiSer.get(endpointUrl).pipe(
      tap((res) =>
        !res.isError ? subject.next(res.result) : subject.next(null)
      ),
      map((res) => (res.isError ? null : res.result))
    );
  }

  public getLookupNameById(arr: lookupInterfcae[], id: string | undefined) {
    if (arr && arr.length > 0 && id) {
      const element = arr.find((ele: any) => ele.id == id);
      return element?.name;
    }
    return '';
  }

  getServices() {
    return this.lookups$.services$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.getServices, this.lookups$.services$);
      })
    );
  }

  getServicesTypes() {
    return this.lookups$.servicesTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.getServicesTyps, this.lookups$.servicesTypes$);
      })
    );
  }

  getServiceFees() {
    return this.lookups$.servicesFees$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.servicesFees, this.lookups$.servicesFees$);
      })
    );
  }

  getServicesConfigs(serviceName:String) {

    return this.lookups$.services$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.getServicesConfig+"?name="+serviceName, this.lookups$.services$);
      })
    );

  }

  getNatioanlities(): Observable<any> {
    return this.lookups$.nationalities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.nationalities,
              this.lookups$.nationalities$
            );
      })
    );
  }

    getLicenseNatioanlities(): Observable<any> {
      return this.lookups$.licenseNationalities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.licencseNationalty,
            this.lookups$.licenseNationalities$
            );
      })
    );
  }

  getTitles() {
    return this.lookups$.titles$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.jobTitles, this.lookups$.titles$);
      })
    );
  }

  getActivities() {
    return this.lookups$.activities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.activities, this.lookups$.activities$);
      })
    );
  }

  getSpecialActivities() {
    return this.lookups$.specialActivities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.specialActivities, this.lookups$.specialActivities$);
      })
    );
  }

  getlegalStatuses() {
    return this.lookups$.legalStatuses$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.legalStatuses, this.lookups$.legalStatuses$);
      })
    );
  }

  getRelationTypes() {
    return this.lookups$.relationTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.relationTypes, this.lookups$.relationTypes$);
      })
    );
  }

  getMyCompanies() {
    return this.lookups$.myCompanies$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.myCompany, this.lookups$.myCompanies$);
      })
    );
  }

  getlicenseTypes() {
    return this.lookups$.licenseTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.licenseTypes, this.lookups$.licenseTypes$);
      })
    );
  }

  getlicenseCategories() {
    return this.lookups$.licenseCategories$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.licenseCategories, this.lookups$.licenseCategories$);
      })
    );
  }

  getlicenseIssuers() {
    return this.lookups$.licenseIssuers$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.licenseIssuers, this.lookups$.licenseIssuers$);
      })
    );
  }

  getcommercialRegisterTypes() {
    return this.lookups$.commercialRegisterTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.commercialRegisterTypes, this.lookups$.commercialRegisterTypes$);
      })
    );
  }

  getfirmTypes() {
    return this.lookups$.firmTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.firmTypes, this.lookups$.firmTypes$);
      })
    );
  }

  getIndustries() {
    return this.lookups$.industries$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.industries,
              this.lookups$.industries$
            );
      })
    );
  }

  getCountries() {
    return this.lookups$.countries$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.countries,
              this.lookups$.countries$
            );
      })
    );
  }
  getCities() {
    return this.lookups$.cities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.cities, this.lookups$.cities$);
      })
    );
  }

  getCitiesByCountryId(countryId: string) {
    const apiPath = `${this.LOOKUPS_APIS.cities}/${countryId}`;
    return this.apiSer
      .get(apiPath, false)
      .pipe(map((res) => (res.isError ? null : res.result)));
  }

  getInteractionsType() {
    return this.lookups$.interactionsType$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.interactionTypes,
              this.lookups$.interactionsType$
            );
      })
    );
  }
  getComplaintTypes() {
    return this.lookups$.complaintTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.complaintTypes,
              this.lookups$.complaintTypes$
            );
      })
    );
  }
  getSectors() {
    return this.lookups$.sectors$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.sectors, this.lookups$.sectors$);
      })
    );
  }
  getEntityTypes() {
    return this.lookups$.entityTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.entityTypes,
              this.lookups$.entityTypes$
            );
      })
    );
  }
  getCompanySize() {
    return this.lookups$.CompanySize$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.companySize,
              this.lookups$.CompanySize$
            );
      })
    );
  }
  getEventNames() {
    return this.apiSer
      .get(this.LOOKUPS_APIS.eventNames)
      .pipe(map((res) => (res.isError ? null : res.result)));
  }
  getReqNums() {
    return this.apiSer
      .get(this.LOOKUPS_APIS.reqNums)
      .pipe(map((res) => (res.isError ? null : res.result)));
  }

  getAnuualTurnover() {
    return this.lookups$.anuualTurnover$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.annualTurnover,
              this.lookups$.anuualTurnover$
            );
      })
    );
  }
  getNoOfEmplyees() {
    return this.lookups$.noOfEmplyees$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.nOfEmployees,
              this.lookups$.noOfEmplyees$
            );
      })
    );
  }

  //get authority
  getAuthorities() {
    return this.lookups$.authorities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.authorities,
              this.lookups$.authorities$
            );
      })
    );
  }

  //get partner companies
  getPartnerCompanies() {
    return this.lookups$.authorities$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(
              this.LOOKUPS_APIS.authorities,
              this.lookups$.authorities$
            );
      })
    );
  }
  getExporterTypes() {
    return this.lookups$.exporterTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.exporterTypes, this.lookups$.exporterTypes$);
      })
    );
  }
  getConsigneeTypes() {
    return this.lookups$.consigneeTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.consigneeTypes, this.lookups$.consigneeTypes$);
      })
    );
  }
  getConsignees() {
    return this.lookups$.consignees$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.consignees, this.lookups$.consignees$);
      })
    );
  }

  getProcessTypes() {
    return this.lookups$.processTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.processTypes, this.lookups$.processTypes$);
      })
    );
  }

  getExistPoints() {
    return this.lookups$.existPoints$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.existPoints, this.lookups$.existPoints$);
      })
    );
  }

  getPortOfDischarges() {
    return this.lookups$.portOfDischarges$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.portOfDischarges, this.lookups$.portOfDischarges$);
      })
    );
  }
  getHsCodes() {
    return this.lookups$.hsCodes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.hsCodes, this.lookups$.hsCodes$);
      })
    );
  }
  getCompaniesWithActiveMembership() {
    return this.lookups$.companiesWithActiveMembership$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.companiesWithActiveMembership, this.lookups$.companiesWithActiveMembership$);
      })
    );
  }
  getPackageTypes() {
    return this.lookups$.packageTypes$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.packageTypes, this.lookups$.packageTypes$);
      })
    );
  }
  getUnitsOfMeasures() {
    return this.lookups$.unitsOfMeasures$.asObservable().pipe(
      switchMap((res: any) => {
        return res
          ? of(res)
          : this.getLookup(this.LOOKUPS_APIS.unitsOfMeasures, this.lookups$.unitsOfMeasures$);
      })
    );
  }
}
