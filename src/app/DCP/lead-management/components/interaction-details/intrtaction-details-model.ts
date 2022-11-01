import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil, combineLatest, Subject } from "rxjs";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { SnackService } from "src/app/SharedModule/Services/snack.service";
import { StatusNotifierService } from "../../status-notifier.service";

@Injectable()
export class IntrtactionDetailsModel {

    //**********************************Data**************************************** */
    endSub$ = new Subject();
    public item: any;
    public interactionResultForm: FormGroup;
    public submitted: boolean = false;
    public interactionForm: any;
    public interactionId: string;
    public leadId: string;
    public newLeadStatus: any;
    constructor(private apiSer: APICallerService,
        private formBuilder: FormBuilder,
        private snakSer: SnackService,
        private router: Router,
        private notifierSer:StatusNotifierService,
        private routeractive: ActivatedRoute,
        private translate:TranslateService) {
        this.initForm();
        this.getData();


    }

    //**********************************Logic**************************************** */
    get f(): { [key: string]: AbstractControl } {
        return this.interactionResultForm.controls;
    }

    getData() {
        this.getid();
        let leadDetails = APIs.leads.interactionDetails + "/" + this.interactionId;
        const mycomleadDetailspanys$ = this.apiSer.get(leadDetails);

        mycomleadDetailspanys$.subscribe((details) => {
            if (!details.isError) {
                const result = details.result;

                console.log(result)

                this.item = {
                    id: result.id,
                    interactionType: result.interactionType,
                    interactionTypeName: result.interactionTypeName,
                    leadCreatedOn: result.leadCreated,
                    leadName: result.leadName,
                    proposedDateTime: result.proposedDateTime,
                    status: result.status,
                    interactionStatusName: result.interactionStatusName,
                    description: result.description,
                    outCome: result.interactionOutcome
                }

            }
        })
    }

    initForm() {
        this.interactionResultForm = this.formBuilder.group({
            description: [null, [Validators.required]],
            outcome: [null]
        })

    }


    getid() {

        // get interaction Id
        this.routeractive.params.subscribe((params: Params) => {

            const id = params['interactionid'];
            this.interactionId = id;

        });

        // get lead Id
        this.routeractive.parent?.params.subscribe((params: Params) => {

            const id = params['id'];
            this.leadId = id;

        });

    }

    saveopportunity(type: string, outcome: string) {
        this.submitted = true;
        this.getid();
        if (outcome == "" || outcome == null) {
            this.snakSer.snack("Please Enter outcome");
            return;
        }
        else {
            console.log('type of action', type);
            let issave: boolean = false;
            let isNoDeal: boolean = false;
            let isCreate: boolean = false;

            if (type == 'save') {
                issave = true;
            }
            else if (type == 'nodeal') {
                isNoDeal = true;
            }
            else if (type == 'create') {
                isCreate = true;
            }
            let leadDetails = APIs.leads.createopportunity + "/" + this.interactionId;

            this.apiSer.post(leadDetails, {
                interactionOutcome: outcome,
                isSave: issave,
                isNoDeal: isNoDeal,
                isCreate: isCreate
            }).pipe(takeUntil(this.endSub$)).subscribe((res)=>{
                if(!res.isError){
                    this.submitted = false;
                    if (type == 'save') {
                        this.snakSer.snack("Interaction outcome is saved ");
                    }
                    else if (type == 'nodeal') {
                        this.snakSer.snack("Interaction is closed ");
                    }
                    else if (type == 'create') {
                        this.snakSer.snack("opportunity submitted ");
                    }
                    // to update lead status in local storage
                    this.changeStatus();
                } else {
                    this.snakSer.snack(this.translate.instant('shared.generalWord.wrongSomeThing'))

                }
              });

            // const mycomleadDetailspanys$ = this.apiSer.post(leadDetails, {
            //     interactionOutcome: outcome,
            //     isSave: issave,
            //     isNoDeal: isNoDeal,
            //     isCreate: isCreate
            // }, false);

            // mycomleadDetailspanys$.subscribe((details) => {
            //     if (!details.isError) {
            //         console.log(details)
            //         //  const result = details.result;
            //         //  this.item = {
            //         //      description: result.description
            //         //  };

            //         if (type == 'save') {
            //             this.snakSer.snack("Interaction outcome is saved ");
            //         }
            //         else if (type == 'nodeal') {
            //             this.snakSer.snack("Interaction is closed ");

            //         }
            //         else if (type == 'create') {
            //             this.snakSer.snack("opportunity submitted ");
            //         }

            //         // to update lead status in local storage
            //         this.changeStatus();


            //     }
            // })
        }


    }

    private changeStatus() {

        let leadId = localStorage.getItem("LeadId");
        this.apiSer.get(APIs.leads.leadDetails + '/' + leadId).subscribe((res) => {
            if (!res.isError) {
                localStorage.setItem("LeadStatus", res.result.status);

                // // to make page refresh after navigation  this is bad soluation
                // this.router.navigate(["services/leads/leadDetails/" + this.leadId + "/interactionlist"])
                //     .then(() => {
                //         window.location.reload();
                //     });

                // push status for StatusNotifierService service
                this.notifierSer.changeStatusListener.next(res.result.statusName);
                this.router.navigate(["dic/services/leads/leadDetails/" + this.leadId + "/interactionlist"]);
            }
        })
    }

}
