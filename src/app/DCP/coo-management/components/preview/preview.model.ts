import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailsItem } from 'src/app/SharedModule/Components/generic-display-details/Interfaces';
import { ProductDetails } from './Interfaces/Products';

@Injectable()
export class PreviewModel {
  //*******************************Mock data ******************************* */
  previewData: any;

  public exporterDetails: DetailsItem[] = [
    {
      title: this.translate.instant('cooModule.detailsData.exporterName'),
      subTitle: this.translate.instant('cooModule.detailsData.english'),
      data: 'Company Name',
    },
    {
      title: this.translate.instant('cooModule.detailsData.exporterName'),
      subTitle: this.translate.instant('cooModule.detailsData.arabic'),
      data: 'اسم الشركه',
    },
    {
      title: this.translate.instant('shared.generalFeilds.country'),
      data: 'UAE',
    },
    {
      title: this.translate.instant('shared.generalFeilds.city'),
      data: 'Abu Dhabi',
    },
    {
      title: this.translate.instant('shared.generalFeilds.phoneNumber'),
      data: '3456754',
    },
    {
      title: this.translate.instant('cooModule.detailsData.pOBOX'),
      data: '5676543456',
    },
    {
      title: this.translate.instant('cooModule.detailsData.fax'),
      data: '3456754',
    },
  ];

  // public get productsData()  {
  //    const result= this.previewData?.invoiceInfo?.products?.map(product=> {
  //     return {
  //       id: this.submittedProducts.length + 1,
  //       code: this.selectedHSCode.code,
  //       arName: this.selectedHSCode.hsCodesNameEnglish,
  //       enName: this.selectedHSCode.hsCodesNameArabic,
  //       country: countryName,
  //       countryId: formData.country,
  //       processTypeCountry: `${formData.process}, ${countryName}`,
  //       processType: formData.process,
  //       quantity: formData.quantity,
  //       unit: formData.unit,
  //       price: formData.price,
  //       totalPrice: `${formData.quantity * formData.price}`,
  //       children: [],
  //     }
  //    });

  //    return result;
  // }

  get shipmentInfoDetails(): DetailsItem[] {
    return [
      {
        title: this.translate.instant('cooModule.detailsData.exporterName'),
        subTitle: this.translate.instant('cooModule.detailsData.english'),
        data: 'Company Name',
      },
      {
        title: this.translate.instant('cooModule.detailsData.exporterName'),
        subTitle: this.translate.instant('cooModule.detailsData.arabic'),
        data: 'اسم الشركه',
      },
      {
        title: this.translate.instant('shared.generalFeilds.country'),
        data: 'UAE',
      },
      {
        title: this.translate.instant('shared.generalFeilds.city'),
        data: 'Abu Dhabi',
      },
      {
        title: this.translate.instant('shared.generalFeilds.phoneNumber'),
        data: '3456754',
      },
      {
        title: this.translate.instant('cooModule.detailsData.pOBOX'),
        data: '5676543456',
      },
      {
        title: this.translate.instant('cooModule.detailsData.fax'),
        data: '3456754',
      },
    ];
  }
  //*******************************constructor******************************* */
  constructor(private translate: TranslateService) {}
}
