import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-renew-licence-info',
  templateUrl: './renew-licence-info.component.html',
  styleUrls: ['./renew-licence-info.component.scss'],
})
export class RenewLicenceInfoComponent implements OnInit {
  renewLicenseForm:FormGroup
  submitted:boolean=false
  myCompanies:any[]=[]
  private endSub$ = new Subject();
  @Input() licenceData:any=[]
  @Output() getCompanyDetails:EventEmitter<any>= new EventEmitter()
  constructor(private fb:FormBuilder,private apiCallerService: APICallerService) { }

  ngOnInit(): void {
    this.build()
    this.getComanies()
  }


  build(){
    this.renewLicenseForm=this.fb.group({
      company:['', Validators.required]
    })
  }

  get f(){return this.renewLicenseForm.controls}

 

 public saveData(){
  console.log("save data");
    this.submitted=true
     if(this.renewLicenseForm.invalid) return
     console.log("form valjue", this.renewLicenseForm.value);
     return true
  }


  //get my companies
  getComanies() {
    this.apiCallerService
      .get(APIs.Companys.getActiveWithMembership)
      .pipe(takeUntil(this.endSub$))
      .subscribe((res) => {
        this.myCompanies = res.result;
        console.log("resoposd", res)
        //this.loading=false;
      });
  }


  getComanyDetails(){
    this.getCompanyDetails.emit(this.renewLicenseForm.controls["company"].value)
  }

}
