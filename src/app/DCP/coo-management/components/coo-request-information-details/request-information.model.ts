import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DetailsItem } from "src/app/SharedModule/Components/generic-display-details/Interfaces";
import { ProductDetails } from "../preview/Interfaces/Products";

@Injectable()
export class RequestInformationModel {
    public exporterDetails: DetailsItem[] = [
        {
            title:this.translate.instant('cooModule.detailsData.exporterName'),
            subTitle: this.translate.instant('cooModule.detailsData.english'),
            data: "Company Name"
        },
        {
            title:this.translate.instant('cooModule.detailsData.exporterName'),
            subTitle:this.translate.instant('cooModule.detailsData.arabic'),
            data: "اسم الشركه"
        },
        {
            title:this.translate.instant('shared.generalFeilds.country'),
            data: "UAE"
        },
        {
            title:this.translate.instant('shared.generalFeilds.city'),
            data: "Abu Dhabi"
        },
        {
            title:this.translate.instant('shared.generalFeilds.phoneNumber'),
            data: "3456754"
        },
        {
            title:this.translate.instant('cooModule.detailsData.pOBOX'),
            data: "5676543456"
        },
        {
            title:this.translate.instant('cooModule.detailsData.fax'),
            data: "3456754"
        },
    ]

    public productsData: ProductDetails[] = [
        {
            hsCode: "345-Product",
            productArbicName: "Woden Door",
            productEnglishName: "باب خشبي",
            countryOfOrigin: "Spain",
            processType: "Spain, Initial",
            pricePerUnit: "AED150/Piece",
            quantity: "20",
            totalPrice: "3,000 ",
        },
        {
            hsCode: "345-Product",
            productArbicName: "Woden Door",
            productEnglishName: "باب خشبي",
            countryOfOrigin: "Spain",
            processType: "Spain, Initial",
            pricePerUnit: "AED150/Piece",
            quantity: "20",
            totalPrice: "3,000 ",
        },
        {
            hsCode: "345-Product",
            productArbicName: "Woden Door",
            productEnglishName: "باب خشبي",
            countryOfOrigin: "Spain",
            processType: "Spain, Initial",
            pricePerUnit: "AED150/Piece",
            quantity: "20",
            totalPrice: "3,000 ",
        },
        {
            hsCode: "345-Product",
            productArbicName: "Woden Door",
            productEnglishName: "باب خشبي",
            countryOfOrigin: "Spain",
            processType: "Spain, Initial",
            pricePerUnit: "AED150/Piece",
            quantity: "20",
            totalPrice: "3,000 ",
        },
        {
            hsCode: "345-Product",
            productArbicName: "Woden Door",
            productEnglishName: "باب خشبي",
            countryOfOrigin: "Spain",
            processType: "Spain, Initial",
            pricePerUnit: "AED150/Piece",
            quantity: "20",
            totalPrice: "3,000 ",
        }
    ]
    //*******************************constructor******************************* */
    constructor(private translate:TranslateService){

    }
}
