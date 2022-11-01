import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";

@Injectable()
export class RefundWalletModel {

    //================================================Data=======================================
    public walletRefundForm: FormGroup;
    public submitted:boolean=false;
    public companyId:string|null='';
    public walletId:string|null='';
    public companyBalance:any|null=0;
    public bankNames:any[]=[];
    public RefundWallet:EventEmitter<any>=new EventEmitter<any>();

    //================================================constructor=================================
    constructor(private formBuilder: FormBuilder ,private router:Router,private apiSer:APICallerService,public activeRoute:ActivatedRoute) {
        this.initForm();
        this.getBackList();

       let companyId= this.activeRoute.snapshot.paramMap.get("companyId");
       let walletId= this.activeRoute.snapshot.paramMap.get("walletId");
       let companyBalance= this.activeRoute.snapshot.paramMap.get("companyBalance");
      
       if(companyId !='' && walletId !=''){
        this.companyId=companyId;
        this.walletId=walletId;
        this.companyBalance=companyBalance;
       }

    }
    //================================================Logic=================================

    get f(): { [key: string]: AbstractControl } {
        return this.walletRefundForm.controls;
    }

    getBackList(){
        this.apiSer.get(APIs.lookups.bankList).subscribe((res)=>{
            if(!res.isError){
                this.bankNames=res.result;
            }
        })
    }

    initForm() {
        this.walletRefundForm = this.formBuilder.group({
            accountNumber: [null, Validators.required],
            bankName: [null, [Validators.required,]],
            iBanNumber: [null, [Validators.required]],
        });
    }

    refundWallet(){
        this.submitted=true;

        if(this.walletRefundForm.invalid) return;

        let data={
            walletId:this.walletId,
            companyId:this.companyId,
            accountNumber:this.walletRefundForm.get('accountNumber')?.value,
            bankId:this.walletRefundForm.get('bankName')?.value,
            iBanNumber:this.walletRefundForm.get('iBanNumber')?.value,
            refundWalletBallance:Number(this.companyBalance)
        }
        
        console.log("data" ,data);
        this.apiSer.post(APIs.membership.refundWallet,data).subscribe((res)=>{
            if(!res.isError){
                this.RefundWallet.emit();
                console.log(res.result)
            }
        })
        console.log(this.walletRefundForm);
    }
    cancle(){
      this.router.navigate(['/dcc/services/wallets/wallet-details'])
    }
}
