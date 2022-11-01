import { Injectable } from "@angular/core";
import { IPersonInfo } from './iPersonInfo';

@Injectable()
export class PersonInfoModel {

    //=========================Data======================
    public data: IPersonInfo = {} as IPersonInfo;

    //====================Constructor====================
    constructor() {}

}