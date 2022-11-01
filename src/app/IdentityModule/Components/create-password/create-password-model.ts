import { flatten } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { AuthenticationService } from "src/app/CallerModule/Services/authentication.service";
import { SnackService } from "src/app/SharedModule/Services/snack.service";


@Injectable()

export class CreatePasswordModel {

    //=========================Data=================================

    public PasswordForm: FormGroup;
    public passwordVisibility: boolean = false
    public passwordConfirmationVisibility: boolean = false
    public submitted: boolean = false;
    private endSub$ = new Subject();
    public paramsObject: any = {};
    public routingData: any = {};
    public resetPassword: boolean = false;
    public OnSubmit: EventEmitter<any> = new EventEmitter<any>();

    //validtion
    public validConditionWhiteSpace: boolean = false;
    public validConditionLength: boolean = false;
    public validConditionOneNumber: boolean = false;
    public validConditionOneCapitalLetter: boolean = false;
    public validConditionSpecialCharcter: boolean = false;



    constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private apiSer: APICallerService, private authService: AuthenticationService, private snakSer: SnackService, public router: Router) {
        this.createForm();
    }


    //========================logic=================================

    get f(): { [key: string]: AbstractControl } {
        return this.PasswordForm.controls;
    }


    createForm() {
        this.PasswordForm = this.formBuilder.group({

            password: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!~@#$%^-_=+{}/;:,.?*])[A-Za-z0-9!~@#$%^-_=+{}/;:,.?*]{8,}$')]],
            confirmPassword: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!~@#$%^-_=+{}/;:,.?*])[A-Za-z0-9!~@#$%^-_=+{}/;:,.?*]{8,}$')]],
        });
    }

    // code to make validation indicator 

    //#validate if string contain white space
    containsWhitespace(str: string) {
        return /\s/.test(str);
    }
    //#validate if string contain  at least one number
    containsNumber(str: string) {
        return /\d/.test(str);
    }

    //#validate if string contain  at least one number
    containsCapitalLatter(str: string) {
        return /[A-Z]/.test(str);
    }

    //#validate if string contain  at least one Special-Character
    containsSpecialCharacter(str: string) {
        return /[!~@#$%^-_=+{}/;:,.?*]/.test(str);
    }

    //check validation main function 

    checkValidation(passwordValue: any) {
        passwordValue=passwordValue.value;
        //#firstCheck-whiteSpace
        if (this.containsWhitespace(passwordValue) != true) {
            this.validConditionWhiteSpace = true;
        } else {
            this.validConditionWhiteSpace = false;
        }

        //#secondCheck-whiteSpace
        if (passwordValue.length >= 8) {
            this.validConditionLength = true;
        } else {
            this.validConditionLength = false;
        }

        //#thirdCheck-oneNumber
        if (this.containsNumber(passwordValue)) {
            this.validConditionOneNumber = true;
        } else {
            this.validConditionOneNumber = false;
        }

        //#fourthCheck-oneCapitalLetter
        if (this.containsCapitalLatter(passwordValue)) {
            this.validConditionOneCapitalLetter = true;
        } else {
            this.validConditionOneCapitalLetter = false;
        }
        //#fifthCheck-oneSpecialCharacter
        if (this.containsSpecialCharacter(passwordValue)) {
            this.validConditionSpecialCharcter = true;
        } else {
            this.validConditionSpecialCharcter = false;
        }


    }

    togglePasswordVisibilty() {
        this.passwordVisibility = !this.passwordVisibility
    }

    toggleConfirmationPasswordVisibilty() {
        this.passwordConfirmationVisibility = !this.passwordConfirmationVisibility
    }

    createNewPassword() {
        let userID, userToken;
        let userPassword = this.PasswordForm.get('password')?.value;
        let passwordConfirmation = this.PasswordForm.get('confirmPassword')?.value;

        // this.checkValidation(userPassword);

        this.submitted = true;

        if (this.PasswordForm.invalid) return;

        if (userPassword != passwordConfirmation) {
            this.snakSer.snack("Password not match with Confirmation Password");
            return
        };

        // catch User data from URL which send As Query prameter

        this.route.queryParamMap
            .subscribe((params) => {
                this.paramsObject = { ...params };
                this.routingData = this.paramsObject.params;
                console.log(this.paramsObject.params);
            }
            );

        // prapare data that will send with password for backEnd
        userID = this.routingData.userId;
        userToken = this.routingData.token;

        let passwordData = {
            userId: userID,
            token: userToken,
            password: this.PasswordForm.get("password")?.value,
        }

        if (this.resetPassword) {
            let resetData = {
                "userId": userID,
                "resetToken": userToken,
                "password": this.PasswordForm.get("password")?.value,
            }
            this.apiSer.post(APIs.Account.ResetPassword, resetData).pipe(takeUntil(this.endSub$)).subscribe(res => {
                if (!res.isError) {
                    if (res.result.isSuccessed) {
                        this.OnSubmit.emit();
                        // this.router.navigate(['/identity', 'login']);
                    }

                }
                //  else {
                //     this.snakSer.snack("Unknown Error");
                // }
            });

        } else {
            this.apiSer.post(APIs.Account.CreatePassword, passwordData).pipe(takeUntil(this.endSub$)).subscribe(res => {
                if (!res.isError) {
                    if (res.result.isSuccessed) {
                        this.router.navigate(['/dcc/identity', 'login']);
                    }

                }
                // else {
                //     this.snakSer.snack("Unknown Error");
                // }
            });
        }
        console.log(this.PasswordForm.value);
    }

    public endSubs() {
        this.endSub$.next("");
        this.endSub$.complete();
    }
}
