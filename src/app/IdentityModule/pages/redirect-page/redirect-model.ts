import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { AuthenticationService } from "src/app/CallerModule/Services/authentication.service";
import { TokenService } from "src/app/CallerModule/Services/token.service";
import { SnackService } from "src/app/SharedModule/Services/snack.service";

@Injectable()
export class RedirectModel {

    //=======================Data===========================

    public uaeCode: string | null = null;
    public uaeErrorDescription: string = '';
    public uaeError: string = '';


    constructor(public translate:TranslateService,public route: ActivatedRoute, private router: Router, private apiCaller: APICallerService, private tokenService: TokenService, private authService: AuthenticationService,private snakSer:SnackService) {

        // catch query prameter from URL to use in Login process
        this.route.queryParams
            .subscribe(params => {
                console.log(params)
                if (params.code) {
                    this.uaeCode = params.code;
                }
                if (params.error_description) {
                    
                    this.uaeErrorDescription = params.error_description;

                }
                if (params.error) {
                    this.uaeError = params.error;
                }
            });


        // check if user cancle login

        if (this.uaeCode == null) {
            if (this.uaeErrorDescription) {
                this.snakSer.snack(this.uaeErrorDescription)
                console.log(this.uaeErrorDescription)
            } else if (this.uaeError) {
                this.snakSer.snack(this.uaeError)
                console.log(this.uaeError);
            }else{
                // this.snakSer.snack("Something went wrong during the login, please try again later!")
                this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'));

            }
            setTimeout(()=>{
                this.router.navigate(['/dcc/identity', 'login']);
            },2000)

        } else {
            // prepare data to send
            let data = {
                authenticationCode: this.uaeCode,
                redirectUri: this.apiCaller.domain + "identity/redirect"


            }

            // call Api For login User

            this.apiCaller.post(APIs.Account.UAEPassLogin, data).subscribe(
                (res) => {
                    if (!res.isError) {
                        console.log(res);
                        this.authService.setUser(res.result.token.accessToken, res.result.user);
                        this.router.navigate(["/dcc/requests"])
                    } else {
                        this.router.navigate(['/dcc/identity', 'login']);
                    }
                }
            )




        }
    }


}
