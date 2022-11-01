import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';

@Component({
  selector: 'payment-list-filter',
  templateUrl: './payment-list-filter.component.html',
  styleUrls: ['./payment-list-filter.component.scss']
})
export class PaymentListFilterComponent implements OnInit {
  //************************************output********************************** */
  @Output() Filter:EventEmitter<any>=new EventEmitter<any>();

  

  //************************************Lookups********************************** */
  public paymentStatus:any[]=[
    
    {
      id:1,
      name:this.translateSer.instant('memberShipsModule.payment.filters.pending')
    },
    {
      id:2,
      name:this.translateSer.instant('memberShipsModule.payment.filters.inactive')
    },
    {
      id:121290001,
      name:this.translateSer.instant('memberShipsModule.payment.filters.approved')
    },
    {
      id:121290002,
      name:this.translateSer.instant('memberShipsModule.payment.filters.rejected')
    },
  ]

  public paymentMethod:any[]=[
  
    {
      id:121290000,
      name:this.translateSer.instant('memberShipsModule.payment.filters.dubaiPay')
    },
    {
      id:121290001,
      name:this.translateSer.instant('memberShipsModule.payment.filters.Offline')
    },
    {
      id:121290002,
      name:this.translateSer.instant('memberShipsModule.payment.filters.Wallet')
    },
    {
      id:121290003,
      name:this.translateSer.instant('memberShipsModule.payment.filters.visaMastercard')
    },
    {
      id:121290004,
      name:this.translateSer.instant('memberShipsModule.payment.filters.bankTransfer')
    }
  ]
  public userComapny:any[]=[];
  public statuscheckAllFlag:boolean=false;
  public methodcheckAllFlag:boolean=false;
  public companycheckAllFlag:boolean=false;

  constructor(private apiSer:APICallerService ,private translateSer:TranslateService) {
    this.getUserCompany();
   }

  ngOnInit(): void {
  }

  getUserCompany(){
    this.apiSer.get(APIs.Companys.getActiveWithMembership).subscribe((res)=>{
      if(!res.isError){
       this.userComapny=res.result;
      }
    })
  }
  filterReq(event:any,optId:any,filterType:string){
    if(event.target.checked){
      if(optId == '0'){
        if(filterType =='paymentstatus'){
          this.statuscheckAllFlag=true;
        }else if(filterType =='paymentMethods'){
          this.methodcheckAllFlag=true;
        }else if(filterType =='userComapny'){
          this.companycheckAllFlag=true;
        }

      }
    }else{
      if(optId == '0'){
        if(filterType =='paymentstatus'){
          this.statuscheckAllFlag=false;
        }else if(filterType =='paymentMethods'){
          this.methodcheckAllFlag=false;
        }else if(filterType =='userComapny'){
          this.companycheckAllFlag=false;
        }

      }
    }

    this.Filter.emit({
      event:event,
      id:optId,
      type:filterType
    })

  }

}
