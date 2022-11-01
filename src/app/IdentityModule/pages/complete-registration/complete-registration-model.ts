import { Injectable } from "@angular/core";

@Injectable()
export class CompleteRegistrationModel {

    public createPasswordFlag:boolean=false;

    constructor(){

    }

    confirmOTP(){
        this.createPasswordFlag=true;

    }
}
