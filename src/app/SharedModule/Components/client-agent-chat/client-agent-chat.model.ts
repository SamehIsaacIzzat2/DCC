import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class ClientAgentChatModel {
   //*************************Moke Data will replace it when we connect on actual APIS*************************** */
   // public chatMessages: any[] = [
   //    {
   //       isAgent: true,
   //       agentName: "Ahmed Imam",
   //       messageContent: "We Previously sent it check your email address, you will find all the required documents for",
   //       dateTime: '22-03-2022 12:08 PM'
   //    },
   //    {
   //       isAgent: false,
   //       messageContent: "We Previously sent it ",
   //       dateTime: '22-03-2022 12:10 PM'
   //    },
   //    {
   //       isAgent: true,
   //       agentName: "Ahmed Imam",
   //       messageContent: "We Previously sent it check your email address, you will find all the required documents for",
   //       dateTime: '22-03-2022 12:12 PM'
   //    },
   // ]

   //**********************************Data**************************************** */
   public clientMessages: FormGroup;
   public SendMessage:EventEmitter<string>=new EventEmitter<string>();

   //**********************************constructor**************************************** */
   constructor(private formBuilder: FormBuilder) {
      this.initForm();

   }

   //**********************************Logic**************************************** */

   // to access form control
   get f(): { [key: string]: AbstractControl } {
      return this.clientMessages.controls;
   }

   // init form
   initForm() {
      this.clientMessages = this.formBuilder.group({
         message: [null],
      });
   }

   sendMessage(){
      let clientMessage=this.f['message'].value
      this.SendMessage.emit(clientMessage);
      this.clientMessages.reset()
      console.log(this.clientMessages)
   }

 

}
