import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { AuthenticationService } from "src/app/CallerModule/Services/authentication.service";
import { SnackService } from "src/app/SharedModule/Services/snack.service";

@Injectable()
export class SetOtpModel {

    public sendOtpForm: any;
    public submitted: boolean = false;
    private endSub$ = new Subject();


    constructor(public formBuilder: FormBuilder, private apiSer: APICallerService, private authService: AuthenticationService, private snakSer: SnackService, public router: Router) {
        this.createForm();
    }

    //=====================logic===========================
    get f(): { [key: string]: AbstractControl } {
        return this.sendOtpForm.controls;
    }

    createForm() {
        this.sendOtpForm = this.formBuilder.group({
            otpCode: [null, [Validators.required, Validators.pattern('^[0-9]{4,6}$'), Validators.minLength(4), Validators.maxLength(6)]],
        });
    }


    // when click on confirm OTP
    confirmOtp() {
        this.submitted = true
        console.log(this.sendOtpForm.value);

        if (this.sendOtpForm.invalid) return;

        let otpData = {
            userId: localStorage.getItem("CurrentUserId"),
            otp: this.sendOtpForm.get("otpCode")?.value,
        }

       
        this.apiSer.post(APIs.Account.VerifyOTP, otpData).pipe(takeUntil(this.endSub$)).subscribe(res => {
            if (!res.isError) {
            //    localStorage.setItem("CurrentUserToken",res.result.token);
               this.router.navigate(['/dcc/identity','createPassword'],{queryParams:{token:res.result.token,userId:res.result.userId}});
            }
            
            // else{
            //     this.snakSer.snack("Unknown Error");
            //   }
        });
    }

    public endSubs() {
        this.endSub$.next("");
        this.endSub$.complete();
    }


}
