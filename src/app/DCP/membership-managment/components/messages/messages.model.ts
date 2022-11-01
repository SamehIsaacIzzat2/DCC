import { Injectable } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";


@Injectable()
export class MessagesModel {
    public messages: any[] = [];
    public loading: boolean = true;
    public requestId:string|null;
    constructor(private apiSer:APICallerService ,public activeRoute:ActivatedRoute) {
       this.getMemberShipId();
    }
    private getMemberShipId(){
        // get membership request  Id
        this.activeRoute?.parent?.params.subscribe((params: Params) => {
            console.log(params)
         const id = params['membershipId'];
         this.requestId = id;
         if(this.requestId){
            this.getMessages();
         }
         console.log(this.requestId)
     });
     }

    public getMessages() {
        this.apiSer.get(APIs.membership.getMessages+"/"+this.requestId +"?pageNumber=1&pageSize=10").subscribe((messageList)=>{
            if(!messageList.isError){
                this.loading = false;
                this.messages=messageList.result.messages;
                console.log(this.messages)
            }
        })
    }
}
