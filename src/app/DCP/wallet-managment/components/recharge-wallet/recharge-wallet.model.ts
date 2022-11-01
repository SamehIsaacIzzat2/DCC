import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Action } from "rxjs/internal/scheduler/Action";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { SnackService } from "src/app/SharedModule/Services/snack.service";

@Injectable()
export class RechargeWalletModel {

    //******************************data************************************** */
    public walletRechargeForm: FormGroup;
    public paymentWay: number = 0;
    public selected:boolean=false;
    public slectedItem:string='';
    public walletId:string|null='';
    public submitted:boolean=false;
    public RechargeWallet:EventEmitter<boolean>=new EventEmitter<boolean>();

    //******************************constructor************************************** */
    constructor(private translate:TranslateService,private snakSer:SnackService,private formBuilder: FormBuilder, private apiSer:APICallerService,private activeRoute:ActivatedRoute) {

      let id=this.activeRoute.snapshot.paramMap.get("walletId");
       if(id){
        this.walletId=id;

       }
        this.initForm()
    }
    //******************************logic************************************** */
    get f(): { [key: string]: AbstractControl } {
        return this.walletRechargeForm.controls;
    }

    initForm() {
        this.walletRechargeForm = this.formBuilder.group({
            chargeAmount: [null, [Validators.required,]],
        });
    }

    setPaymentWay(paymentWay:number,element:string) {
       //my enhancement
        this.slectedItem=element;
        this.paymentWay=paymentWay;

        //ToDo  ===please enhence this code  ====
        // if(element.classList.contains("selected")){
        //     element.classList.remove("selected");
        //     this.paymentWay = 0;
        // }else{
        //     element.classList.add("selected");
        //     this.paymentWay = paymentWay;
        // }
    }

    chargeWallet() {
        this.submitted=true;
        if(this.walletRechargeForm.invalid) return;
        if(this.walletRechargeForm.get("chargeAmount")?.value=='0' || this.paymentWay==0) {
            // will change if there ask validation message for this points
            this.snakSer.snack(
                this.translate.instant('shared.generalWord.wrongSomeThing')
              );
              return;
        };

        // preparing date for sending to charge wallet
        let data = {
            paymentMethod: this.paymentWay,
            amountInAED:Number(this.walletRechargeForm.get("chargeAmount")?.value),
            transactionDate:new Date().toISOString(),
            statusCode:121290001,
            rejectionReason:'',
            transactionType:121290000,
            walletId:this.walletId
        
        }

        // call Api
        this.apiSer.post(APIs.membership.rechargeWallet,data).subscribe((res)=>{
            if(!res.isError){
                this.RechargeWallet.emit(true);
                console.log(res.result)
            }
        })
    

    }


}
