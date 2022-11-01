import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { companyInterface } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyDetails$: BehaviorSubject<companyInterface | null> = new BehaviorSubject<
    any | null
  >(null);
  companyEditedDetails$: BehaviorSubject<companyInterface | null> = new BehaviorSubject<
    any | null
  >(null);
  constructor(private apiSer: APICallerService) {}

  getCompanyDetails(companyId: string): Observable<any> {
    const apiPath = `${APIs.Companys.getCompany}/${companyId}`;
    return this.apiSer.get(apiPath).pipe(
      map((res) => (!res.isError ? res : null)),
      tap((response) => this.companyDetails$.next({ ...response?.result, id: companyId }))
    );
  }
}
