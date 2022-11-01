import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { companyWallet } from '../../pages/wallet-details/Interfaces/transactionData';

@Component({
  selector: 'company-wallet-balance-card',
  templateUrl: './company-wallet-balance.component.html',
  styleUrls: ['./company-wallet-balance.component.scss']
})
export class CompanyWalletBalanceComponent implements OnInit {
 //*************************************Inputs & outputs************************************** */
 @Input() item:companyWallet;
//  @Input()  isSelected:boolean=false;
 @Output() Selected:EventEmitter<any>=new EventEmitter<any>();

  //*************************************Data************************************** */
   
  constructor() { }

  ngOnInit(): void {
  }

  selectCompany(selectedCompanyId:any,selectedWalletId:any,selectedCompanybalance:any){
    this.Selected.emit({companyId:selectedCompanyId,walletId:selectedWalletId,balance:selectedCompanybalance});
  }

}
