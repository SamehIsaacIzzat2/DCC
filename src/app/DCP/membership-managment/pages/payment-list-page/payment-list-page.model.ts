import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { iBanner } from "src/app/SharedModule/Components/banner/banner.interface";
import { PaymentListFilterComponent } from "../../components/payment-list-filter/payment-list-filter.component";
import { PaymentDataModel } from "./Interfaces/Payment";


@Injectable()
export class PaymentListPageModel {

    //*********************************LookUps********************************* */
    public paymentStatus: any[] = [

        {
            id: 1,
            name: this.translateSer.instant('memberShipsModule.payment.filters.pending')
        },
        {
            id: 2,
            name: this.translateSer.instant('memberShipsModule.payment.filters.inactive')
        },
        {
            id: 121290001,
            name: this.translateSer.instant('memberShipsModule.payment.filters.approved')
        },
        {
            id: 121290002,
            name: this.translateSer.instant('memberShipsModule.payment.filters.rejected')
        },
    ]

    public paymentMethod: any[] = [

        {
            id: 121290000,
            name: this.translateSer.instant('memberShipsModule.payment.filters.dubaiPay')
        },
        {
            id: 121290001,
            name: this.translateSer.instant('memberShipsModule.payment.filters.Offline')
        },
        {
            id: 121290002,
            name: this.translateSer.instant('memberShipsModule.payment.filters.Wallet')
        },
        {
            id: 121290003,
            name: this.translateSer.instant('memberShipsModule.payment.filters.visaMastercard')
        },
        {
            id: 121290004,
            name: this.translateSer.instant('memberShipsModule.payment.filters.bankTransfer')
        }
    ]
    //*******************************Data****************************** */
    public p: number = 1;
    public totalPages: number = 0;
    public banner: iBanner = {
        breadCrump: [
            {
                title: this.translateSer.instant('bannerData.breadCrump.home'),
                link: '/services',
            },
            {
                title: this.translateSer.instant('memberShipsModule.documents.documents')
            }

        ],
        subbreadCrump: [],
        // title: this.translateSer.instant('bannerData.breadCrump.newMemberShip'),
    };
    public rowData: PaymentDataModel[] = []
    public displayedData: PaymentDataModel[] = []
    public loading: boolean = true;
    public filterKeys: any[] = [];
    public userComapny: any[] = [];

    //*******************************Constractor****************************** */
    constructor(private translateSer: TranslateService, private apiSer: APICallerService) {
        // get payment list

        this.getUserCompany();
        this.getPaymentList();
    }

    //*********************************Logic***************************************** */
    changePage(data: any) {
        this.totalPages = Math.ceil(this.rowData.length / 5);
        console.log(this.totalPages)
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

    getUserCompany() {
        this.apiSer.get(APIs.Companys.getActiveWithMembership).subscribe((res) => {
            if (!res.isError) {
                this.userComapny = res.result;
            }
        })
    }

    getPaymentList() {
        this.apiSer.get(APIs.membership.paymentList).subscribe((res) => {
            if (!res.isError) {
                this.loading = false;
                this.rowData = res.result;
                this.displayedData = this.rowData
            }
        })
    }

    filterData(filterPrams: any) {
        if (filterPrams.event.target.checked) {
            // if user check all check box
            if (filterPrams.id == '0') {
                if (filterPrams.type == 'paymentstatus') {
                    // collect all status and map it to new shap to be suitable with the rest of code
                    let allStatus = this.paymentStatus.map((item) => { return { type: 'paymentstatus', id: item.id } });
                    this.filterKeys.push(...allStatus);

                } else if (filterPrams.type == 'paymentMethods') {
                    let allMethods = this.paymentMethod.map((item) => { return { type: 'paymentMethods', id: item.id } });
                    this.filterKeys.push(...allMethods);

                } else if (filterPrams.type == 'userComapny') {
                    let allUserCompany = this.userComapny.map((item) => { return { type: 'userComapny', id: item.id } });
                    this.filterKeys.push(...allUserCompany);
                }
            }
            else {
                this.filterKeys.push({ type: filterPrams.type, id: filterPrams.id })
            }

        } else {
            if (filterPrams.id == '0') {
                if (filterPrams.type == 'paymentstatus') {
                    // collect all status and map it to new shap to be suitable with the rest of code
                    let allStatus = this.paymentStatus.map((item) => { return { type: 'paymentstatus', id: item.id } });
                    this.filterKeys = this.filterKeys.filter((item) => {

                        if (allStatus.findIndex((state) => state.id == item.id && state.type == item.type) != -1) {
                            return false;

                        } else {
                            return true
                        }
                    })
                } else if (filterPrams.type == 'paymentMethods') {
                    let allMethods = this.paymentMethod.map((item) => { return { type: 'paymentMethods', id: item.id } });
                    this.filterKeys = this.filterKeys.filter((item) => {
                        if (allMethods.findIndex((method) => method.id == item.id && method.type == item.type) != -1) {
                            return false;

                        } else {
                            return true
                        }
                    })
                } else if (filterPrams.type == 'userComapny') {
                    let allUserCompany = this.userComapny.map((item) => { return { type: 'userComapny', id: item.id } });
                    this.filterKeys = this.filterKeys.filter((item) => {
                        if (allUserCompany.findIndex((company) => company.id == item.id && company.type == item.type) != -1) {
                            return false;
                        } else {
                            return true
                        }
                    })
                }
            } else {
                // console.log(filterPrams.id, this.filterKeys.findIndex((item) => item.id == filterPrams.id && item.type));
                this.filterKeys.splice(this.filterKeys.findIndex((item) => item.id == filterPrams.id && item.type), 1);
            }

        }

        this.filter(this.filterKeys);
        console.log(this.filterKeys)

    }

    filter(filterKeys: any[]) {
        let paymentStatusKeys = filterKeys.filter((keys) => keys.type == "paymentstatus").map((item) => { return item.id });
        let paymentMethodsKeys = filterKeys.filter((keys) => keys.type == "paymentMethods").map((item) => { return item.id });
        let companyIdKeys = filterKeys.filter((keys) => keys.type == "userComapny").map((item) => { return item.id });

        // debugger
        //--------------------------------------------- first case (No filteration) --------------------------------

        if (paymentStatusKeys.length == 0 && paymentMethodsKeys.length == 0 && companyIdKeys.length == 0) {
            this.displayedData = this.rowData;
        } else {
            this.displayedData = this.rowData.filter(
                (item) => {
                    // console.log("11111",paymentMethodsKeys.length>0 ?paymentMethodsKeys.findIndex((key)=>key ==item.paymentMethod) !=-1 :true)
                    // console.log("22222",paymentStatusKeys.length >0 ? paymentStatusKeys.findIndex((key)=>key ==item.statuscode) != -1 :true  )
                    // console.log("33333",companyIdKeys.length     >0 ?  companyIdKeys.findIndex((key)=>key ==item.companyID) !=-1:true )

                    // console.log( (paymentMethodsKeys.length>0 ?paymentMethodsKeys.findIndex((key)=>key ==item.paymentMethod) !=-1 :true)
                    // && (paymentStatusKeys.length >0 ? paymentStatusKeys.findIndex((key)=>key ==item.statuscode) != -1 :true) 
                    // && (companyIdKeys.length     >0 ?  companyIdKeys.findIndex((key)=>key ==item.companyID) !=-1:true));
                    return (
                        (paymentMethodsKeys.length > 0 ? paymentMethodsKeys.findIndex((key) => key == item.paymentMethod) != -1 : true)
                        && (paymentStatusKeys.length > 0 ? paymentStatusKeys.findIndex((key) => key == item.statuscode) != -1 : true)
                        && (companyIdKeys.length > 0 ? companyIdKeys.findIndex((key) => key == item.companyID) != -1 : true));
                });
        }
    }


}
