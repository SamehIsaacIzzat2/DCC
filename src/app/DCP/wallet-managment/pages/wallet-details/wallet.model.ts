import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { companyWallet, TransactionData } from "./Interfaces/transactionData";


@Injectable()
export class WalletModel {

  //*******************************Data****************************** */
  public p: number = 1;
  public totalPages: number = 0;
  public transactionLoading = true;
  public banner: iBanner = {
    breadCrump: [
      {
        title: this.translateSer.instant('bannerData.breadCrump.home'),
        link: '/services',
      },
      {
        title: this.translateSer.instant('memberShipsModule.wallet.wallets')
      }

    ],
    subbreadCrump: [],
    title: this.translateSer.instant('memberShipsModule.wallet.wallets'),
  };
  public companyId: string = '';
  public walletId: string = '';
  public companyBalance:number=0;
  public transactionTypeIds: string[] = []

  //*******************************lookup data****************************** */
  public walletTransaationStatus: any[] = [
    {
      id: '121290000',
      name: 'In Transaction'
    },
    {
      id: '121290001',
      name: 'Out Transaction'
    }
  ]

  public rowData: TransactionData[] = [];
  data: companyWallet[] = [];


  //*******************************Constractor****************************** */

  constructor(private translateSer: TranslateService, private apiSer: APICallerService) {

    // get company with its balance
    this.getCompanyWalletData();

  }

  //*********************************Logic***************************************** */
  changePage(data: any) {

    this.totalPages = Math.ceil(this.rowData.length / 5);
    if (data > this.totalPages) {
      this.p = this.totalPages;
      return;
    } else if (data <= 0) {
      this.p = 1;
      return;

    } else {
      this.p = data;
      return;
    }
  }

  getCompanyWalletData() {

    //*******************************Get user Id from local storage******************************** */

    let user = JSON.parse(localStorage.getItem("user")!);
    let userId = user.id;  // i comment that for testing reason because the static id has commpany 
    //  let userId = "6c1afffa-a127-ed11-9db1-0022480da3da";

    //*******************************get user company with its wallet balance******************************** */
    // + "?primarycontactid=" + userId
    this.apiSer.get(APIs.membership.companyWallet).subscribe((res) => {
      if (!res.isError) {
        this.data = res.result;

        //==================add selected properity for company object to control transaction appearance===========

        this.addSelectedProperity();

        if (this.data.length > 0) {
          //==================make first company selected by defult===========
          this.data[0].selected = true;
          //==================get all transactions for the first company ===========

          if (this.data[0]?.companyId != '') {
            this.companyId = this.data[0]?.companyId;
            this.walletId = this.data[0]?.walletId;
            this.companyBalance=this.data[0]?.balance;
            this.getCompanyTransaction();
          }
        }

      }
    })

  }

  // add selected properity for all objects in user company List
  addSelectedProperity() {
    this.data = this.data.map((company: any) => {
      return { ...company, selected: false }
    })

  }

  // add selected style for company that we selected
  catchSelectedCompany(companydata: any) {
    this.companyId = companydata.companyId;
    this.walletId = companydata.walletId;
    this.companyBalance=companydata.balance;
    this.data = this.data.map((element: any) => {
      if (element.companyId == companydata.companyId) {
        element = { ...element, selected: true }
      } else {
        element = { ...element, selected: false }
      }
      return element
    });
    this.getCompanyTransaction();
    // console.log(`companyId ${this.companyId} ,walletId ${this.walletId}`)
  }

  // filter transaction according to check
  filterTansaction(event: any, optionId: string) {
    if ((event.srcElement as any).checked) {
      this.transactionTypeIds.push(optionId)
    } else {
      this.transactionTypeIds = this.transactionTypeIds.filter((transactionId) => transactionId != optionId)
    }
    this.getCompanyTransaction();
  }



  // get transaction per company

  getCompanyTransaction() {
    let TransactionTypeId = "0";
    if (this.transactionTypeIds.length != 1) {
      TransactionTypeId = "0";
    } else {
      if (this.transactionTypeIds[0] == '0') {
        TransactionTypeId = "0";
      } else {
        TransactionTypeId = this.transactionTypeIds[0];
      }
    }

    this.apiSer.get(APIs.membership.getCompanyWalletTransaction + "?CompanyId=" + this.companyId + "&TransactionTypeId=" + TransactionTypeId + "&pageNumber=" + this.p + "&pageSize=50").subscribe((transactions) => {
      if (!transactions.isError) {
        this.transactionLoading = false;
        this.rowData = transactions.result.walletTransaction;
        console.log(transactions.result);
      }
    })


  }
}
