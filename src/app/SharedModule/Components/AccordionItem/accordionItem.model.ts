import { Injectable } from "@angular/core";


@Injectable()
export class AccordionItemModel{
    //================Data========================
    public isExpanded: boolean = true

    //===============Logic========================
    public expand(){
        this.isExpanded = !this.isExpanded
    }

}
