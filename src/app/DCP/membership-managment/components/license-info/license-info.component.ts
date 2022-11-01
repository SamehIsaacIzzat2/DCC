import { Component, OnInit,Input } from '@angular/core';
import { License } from './license.model';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { Subject, takeUntil } from 'rxjs';
import { MyCompany } from './license.interface';
@Component({
  selector: 'license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  providers: [License],
})
export class LicenseInfoComponent implements OnInit {
  public myCompanies: MyCompany[] = [];
  public loading = true;
  private endSub$ = new Subject();
  dpValue="2022-11-24T22:00:00Z"
  @Input() action: string;
  public istrue:boolean=true
  constructor(
    public model: License,
    private apiCallerService: APICallerService
  ) {}

  ngOnInit(): void {
    this.model.getSelectData();
    this.getMyCompany();
  }

  //get my companies
  getMyCompany() {
    this.apiCallerService
      .get(APIs.membership.companyWithoutMemebership)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        this.myCompanies = res.result;
        console.log("resoposd", res)
        this.loading=false;
      });
  }

  addCompany(){
    this.myCompanies.length=0;
    this.model.verified=false
  }
}
