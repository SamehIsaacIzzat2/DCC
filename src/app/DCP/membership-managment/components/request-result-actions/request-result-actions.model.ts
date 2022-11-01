import { Injectable } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { LocalStorage } from "angular-web-storage";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";
import { LanguageService } from "src/app/SharedModule/Services/language.service";
import { StatusNotifierService } from "../../status-notifier.service";
import { ChatMessage, LastUpdateDate } from "./Interfaces/ChatMessage";

@Injectable()
export class RequestResultActionsModel {

    //*************************Data*************************** */
    public allChatMessages: ChatMessage[] = [];
    public requestId: string | null;
    public lastUpdateMessageAndDate: LastUpdateDate = {} as LastUpdateDate;
    public requestCurrentStatus: any = '';

    //*************************constractor*************************** */

    constructor(public langSer: LanguageService, public apiSer: APICallerService, private activeRoute: ActivatedRoute, private statusNotifierSer: StatusNotifierService) {

        // catch request Id
        this.getMemberShipId()

        // check status to control the appearance of payment button
        this.checkStatus();



    }

    private getMemberShipId() {
        // get membership request  Id
        this.activeRoute.parent?.params.subscribe((params: Params) => {
            console.log(params)
            const id = params['membershipId'];
            this.requestId = id;
            if (this.requestId) {
                this.getChatData();
            }
            console.log(this.requestId)
        });
    }

    private getChatData() {
        this.apiSer.get(APIs.membership.requestResultActions + "/" + this.requestId + "?pageNumber=1&pageSize=50").subscribe((res) => {
            if (!res.isError) {
                this.allChatMessages = res.result.action;
                //get last update from agent
                
                if(this.allChatMessages && this.allChatMessages.length >0){
                    this.getLastUpdate();
                }
               
                // this.allChatMessages.reverse()
                // this.allChatMessages.reverse()
                console.log(this.allChatMessages);
            }
        })
    }

    public sendClientResponse(userMessage: string) {
        // prepare Message object to send
        let data = {
            membershipRequestId: this.requestId,
            comment: userMessage
        }
        // call Api To send Message
        this.apiSer.post(APIs.membership.clientReply, data).subscribe((res) => {
            if (!res.isError) {
                this.getChatData();
                // console.log("messages status",res)
            }
        })
    }

    public getLastUpdate() {
        this.allChatMessages.forEach((message) => {
            if (message.isAgent) {
                this.lastUpdateMessageAndDate = { date: message.createDate, message: message.comment };
                return;
            }
        })
    }

    public  checkStatus() {
        this.statusNotifierSer.statusNotifier.subscribe((value) => {
            this.requestCurrentStatus = value;
            // console.log(this.requestCurrentStatus)
        })


    }

}
