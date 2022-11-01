import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { Step } from 'src/app/SharedModule/Components/steeper/iStepper.interface';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceInfoComponent } from '../../components/invoice-info/invoice-info.component';
import { Router } from '@angular/router';
import { ExporterInfoComponent } from '../../components/exporter-info/exporter-info.component';
import { ConsigneeInfoComponent } from '../../components/consignee-info/consignee-info.component';
import { ShipmentInfoComponent } from '../../components/shipment-info/shipment-info.component';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';
import { AddNewConsigneeComponent } from '../../components/add-new-consignee/add-new-consignee.component';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';

@Injectable()
export class CooModel {
  public activeStep: number = 1;
  private endSub$ = new Subject();
  public requestId: any;
  public hideActions: boolean = false;

  //start banner
  banner: iBanner = {
    breadCrump: [
      {
        title: this.translate.instant('bannerData.breadCrump.home'),
        link: '/services',
      },
      {
        title: this.translate.instant('bannerData.breadCrump.requests'),
        link: '/services/coo',
      },
      {
        title: this.translate.instant('bannerData.breadCrump.createCoo'),
        link: '',
      },
    ],
    subbreadCrump: [],
    title: this.translate.instant('cooModule.createCoo'),
  };
  //banner steps
  steps: Step[] = [
    {
      stepIndex: 1,
      stepTitle: this.translate.instant('cooModule.stepper.exporterInfo'),
    },
    {
      stepIndex: 2,
      stepTitle: this.translate.instant('cooModule.stepper.consigneeInfo'),
    },
    {
      stepIndex: 3,
      stepTitle: this.translate.instant('cooModule.stepper.invoiceInfo'),
    },
    {
      stepIndex: 4,
      stepTitle: this.translate.instant('cooModule.stepper.shipmentInfo'),
    },

    {
      stepIndex: 5,
      stepTitle: this.translate.instant('cooModule.stepper.attachments'),
    },
    {
      stepIndex: 6,
      stepTitle: this.translate.instant('cooModule.stepper.preview'),
    },
  ];

  public ExporterInfoComponent: ExporterInfoComponent;
  public ConsigneeInfoComponent: ConsigneeInfoComponent;
  public AddNewConsigneeComponent: AddNewConsigneeComponent;
  public InvoiceInfoComponent: InvoiceInfoComponent;
  public ShipmentInfoComponent: ShipmentInfoComponent;
  public AttachmentsComponent: AttachmentsComponent;

  public finalData: any = {};

  constructor(
    private translate: TranslateService,
    private apiSer: APICallerService,
    private snakSer: SnackService,
    private router: Router
  ) {}

  //next step

  public nextStep() {
    switch (this.activeStep) {
      case 1:
        if (this.ExporterInfoComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            ...this.ExporterInfoComponent.model.userCompanyForm.value,
          };
        }
        break;
      case 2:
        if (this.ConsigneeInfoComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            consigneeInfo: {
              ...this.ConsigneeInfoComponent.model.consigneeForm.value,
            },
          };
          console.log(JSON.stringify(this.finalData));
        }
        break;
      case 3:
        if (this.InvoiceInfoComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            ...this.InvoiceInfoComponent.model.submittedData,
          };
        }
        break;
      case 4:
        if (this.ShipmentInfoComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            shipmentInfo: {
              ...this.ShipmentInfoComponent.model.shipmentForm.value,
            },
          };

          console.log('After ShipmentInfo', this.finalData);
        }
        break;
      case 5:
        if (this.AttachmentsComponent.model.saveData()) {
          this.activeStep = this.activeStep + 1;
          this.finalData = this.finalData = {
            ...this.finalData,
            documents: this.AttachmentsComponent.model.attachments,
            // documents: []
          };
          const jsn = JSON.stringify(this.finalData);
          console.log('JSON.stringify', jsn);
          //this.perpareViewData();
        }
        break;
      case 6:debugger
        this.activeStep = this.activeStep + 1;
        this.hideActions = true;
        break;
      default:
        alert('rating');
      // this._router.navigate(['/profile/social']);
    }
  }

  //back
  backForm() {
    this.activeStep = this.activeStep - 1;
    this.hideActions = false;
  }

  //submit from
  // submit() {
  //   this.router.navigate(['/services/coo/request-result']);
  // }
  submit(isDraft: boolean) {
    const requestBody = this.getRequestBodyToSubmit();

    const apiPath = APIs.coo.creatRequest + isDraft;
    this.apiSer
      .post(apiPath, requestBody)
      .pipe(takeUntil(this.endSub$))
      .subscribe({
        next: (res) => {
          console.log('res of submit request', res);
          if (!res.isError) {
            this.activeStep = this.activeStep + 1;
            this.requestId = res.result.id;
            this.hideActions = true;

            //this.requestId = res.company as any
            // this._router.navigate(['/services/companys/add-company/success/']);
          }
        },
        error: () => {
          this.snakSer.snack(
            this.translate.instant('shared.generalWord.wrongSomeThing')
          );
        },
      });
  }
  //end sub$
  public endsubs() {
    this.endSub$.next('');
    this.endSub$.complete();
  }

  get previewRequestData() {
    if (
      !this.finalData.consigneeInfo ||
      !this.finalData.shipmentInfo ||
      !this.finalData.invoiceInfo
    ) {
      return;
    }
    const destinationCountry =
      this.ShipmentInfoComponent?.model?.allCountries?.filter((country) => {
        return country.id == this.finalData.shipmentInfo?.destinationCountryId;
      })[0];
    const destinationCity =
      this.ShipmentInfoComponent?.model?.allCities?.filter((city) => {
        return city.id == this.finalData.shipmentInfo?.destinationCityId;
      })[0];

    const selectedCompany =
      this.ExporterInfoComponent?.model?.usercompanies?.filter((company) => {
        return company.id == this.finalData?.company;
      })[0];

    const selectedConsigneeIfAny =
      this.ConsigneeInfoComponent?.model?.consignees?.filter((consignee) => {
        return (
          consignee.consigneeId == this.finalData?.consigneeInfo?.consignee
        );
      })[0];
    const newConsigneeIfAny = this.finalData.consigneeInfo?.newConsignee;

    const data = {
      exporterInfo: [
        {
          title: this.translate.instant('cooModule.detailsData.exporterName'),
          subTitle: this.translate.instant('cooModule.detailsData.english'),
          data: selectedCompany?.companyNameEnglish,
        },
        {
          title: this.translate.instant('cooModule.detailsData.exporterName'),
          subTitle: this.translate.instant('cooModule.detailsData.arabic'),
          data: selectedCompany?.companyNameArabic,
        },
        {
          title: this.translate.instant('shared.generalFeilds.country'),
          data: selectedCompany?.country,
        },
        {
          title: this.translate.instant('shared.generalFeilds.city'),
          data: selectedCompany?.city,
        },
        {
          title: this.translate.instant('shared.generalFeilds.phoneNumber'),
          data: selectedCompany?.phoneNumber,
        },
        {
          title: this.translate.instant('cooModule.detailsData.pOBOX'),
          data: selectedCompany?.poBox,
        },
        {
          title: this.translate.instant('cooModule.detailsData.fax'),
          data: selectedCompany?.fax,
        },
      ],

      consigneeInfo: [
        {
          title: this.translate.instant('cooModule.detailsData.consigneeName'),
          data:
            newConsigneeIfAny?.consigneeName ||
            `${selectedConsigneeIfAny?.consigneeFirstname} ${selectedConsigneeIfAny?.consigneeLastname}`,
        },
        {
          title: this.translate.instant('cooModule.detailsData.consigneeType'),
          data:
            this.AddNewConsigneeComponent?.model?.consigneeTypes?.filter(
              (type) => {
                return type.id == newConsigneeIfAny?.consigneeType;
              }
            )[0].consigneeTypesNameEnglish ||
            selectedConsigneeIfAny?.consigneeType,
        },
        {
          title: this.translate.instant('cooModule.detailsData.phoneNumber'),
          data:
            newConsigneeIfAny?.phoneNumber ||
            `${selectedConsigneeIfAny?.phoneNumber?.dialCode}${selectedConsigneeIfAny?.phoneNumber?.number}`,
        },
        {
          title: this.translate.instant('cooModule.detailsData.addressLine1'),
          data:
            newConsigneeIfAny?.addressLine1 ||
            selectedConsigneeIfAny?.addressLine1,
        },
        {
          title: this.translate.instant('cooModule.detailsData.addressLine2'),
          data:
            newConsigneeIfAny?.addressLine2 ||
            selectedConsigneeIfAny?.addressLine2,
        },
        {
          title: this.translate.instant('cooModule.detailsData.pOBOX'),
          data: newConsigneeIfAny?.poBox || selectedConsigneeIfAny?.poBox,
        },
        {
          title: this.translate.instant('cooModule.detailsData.country'),
          data:
            this.AddNewConsigneeComponent?.model?.allCountries?.filter(
              (country) => {
                return country.id == newConsigneeIfAny?.countryId;
              }
            )[0].name || selectedConsigneeIfAny?.countryName,
        },
        {
          title: this.translate.instant('cooModule.detailsData.city'),
          data:
            this.AddNewConsigneeComponent?.model?.allCities?.filter((city) => {
              return city.id == newConsigneeIfAny?.cityId;
            })[0].name || selectedConsigneeIfAny?.cityName,
        },
        {
          title: this.translate.instant('cooModule.detailsData.fax'),
          data: newConsigneeIfAny?.fax || selectedConsigneeIfAny?.fax,
        },
      ],
      invoiceInfo: {
        previewDetails: [
          {
            title: this.translate.instant(
              'cooModule.invoiceInfo.invoiceNumber'
            ),
            data: this.finalData.invoiceInfo?.number,
          },
          {
            title: this.translate.instant('cooModule.invoiceInfo.invoiceDate'),
            data: this.finalData.invoiceInfo?.date,
          },
          {
            title: this.translate.instant(
              'cooModule.invoiceInfo.invoiceAmount'
            ),
            data: this.finalData.invoiceInfo?.amount,
          },
        ],
        products: this.finalData.invoiceInfo?.products,
        //   ?.map((item: any) => {
        //     return {
        //       hsCode: item.code,
        //       productArbicName: item.arName,
        //       productEnglishName: item.enName,
        //       countryOfOrigin: item.country,
        //       processType: item.processType,
        //       pricePerUnit: item.price,
        //       quantity: item.quantity,
        //       totalPrice: item.totalPrice,
        //     };
        //   }),
      },
      shipmentInfo: [
        {
          title: this.translate.instant(
            'cooModule.detailsData.transportationMode'
          ),
          data: this.ShipmentInfoComponent?.model?.transportationModes?.filter(
            (mode) => {
              return (
                mode.id == this.finalData.shipmentInfo?.transportationModeId
              );
            }
          )[0].name,
        },
        {
          title: this.translate.instant('cooModule.detailsData.exitPoint'),
          data: this.finalData.shipmentInfo?.exitPointId,
        },
        {
          title: this.translate.instant(
            'cooModule.detailsData.portofDischarge'
          ),
          data: this.finalData.shipmentInfo?.dischargePortId,
        },
        {
          title: this.translate.instant(
            'cooModule.detailsData.expectedDeparture'
          ),
          data: this.finalData.shipmentInfo?.departureDate,
        },
        {
          title: this.translate.instant(
            'cooModule.detailsData.finalDestination'
          ),
          data: `${destinationCountry.name}, ${destinationCity.name}`,
        },
        {
          title: this.translate.instant(
            'cooModule.shipmentInfo.printProductsInCOO'
          ),
          data: this.finalData.shipmentInfo?.printProductsInCOO,
        },
        {
          title: this.translate.instant(
            'cooModule.detailsData.additionalDetails'
          ),
          data: this.finalData.shipmentInfo?.addtionalDetails,
        },
      ],
      attachments: this.finalData.documents,
    };

    return data;
  }

  getRequestBodyToSubmit() {
    const requestBody = {
      consigneeId: this.finalData.consigneeInfo.consignee,
      exporterTypeId: this.finalData.exporterType,
      companyId: this.finalData.company,
      cooRequestType: 0,
      consignee: this.finalData.consigneeInfo.consignee
        ? null
        : {
            id: 'string',
            firstname: this.finalData.consigneeInfo.newConsignee?.consigneeName,
            lastname: '',
            type: this.finalData.consigneeInfo.newConsignee?.consigneeType,
            addressLine1:
              this.finalData.consigneeInfo.newConsignee?.addressLine1,
            addressLine2:
              this.finalData.consigneeInfo.newConsignee?.addressLine2,
            city: this.finalData.consigneeInfo.newConsignee?.cityId,
            country: this.finalData.consigneeInfo.newConsignee?.countryId,
            phoneNumber: `${this.finalData.consigneeInfo?.newConsignee?.phoneNumber?.dialCode}${this.finalData.consigneeInfo.newConsignee?.phoneNumber?.number}`,
            fax: this.finalData.consigneeInfo?.newConsignee?.fax,
            poBox: this.finalData.consigneeInfo.newConsignee?.poBox,
          },
      documents: this.finalData.documents.map((item: any) => {
        return {
          documentName: 'string',
          filesCount: 0,
          files: [
            {
              id: 'string',
              documentName: 'string',
              fileName: 'string',
              content: 'string',
              serverRelativeUrl: 'string',
            },
          ],
        };
      }),
      // [
      //   {
      //     documentName: 'string',
      //     filesCount: 0,
      //     files: [
      //       {
      //         id: 'string',
      //         documentName: 'string',
      //         fileName: 'string',
      //         content: 'string',
      //         serverRelativeUrl: 'string',
      //       },
      //     ],
      //   },
      // ],
      invoiceInfo: {
        number: this.finalData.invoiceInfo.number,
        date: this.finalData.invoiceInfo.date,
        amount: this.finalData.invoiceInfo.amount,
        currency: this.finalData.invoiceInfo.amount.currency,
        products: this.finalData.invoiceInfo.products.map((item: any) => {
          return {
            hsId: item.id,
            countryId: item.countryId,
            processTypeId: item.processType,
            unitofMeasureId: item.unit,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            totalPrice: item.totalPrice,
            packages: item.packages,
          };
        }),
      },
      shipmentInfo: {
        transportationModeId: this.finalData.shipmentInfo.transportationModeId,
        exitPointId: this.finalData.shipmentInfo.exitPointId,
        dischargePortId: this.finalData.shipmentInfo.dischargePortId,
        departureDate: this.finalData.shipmentInfo.departureDate,
        destinationCityId: this.finalData.shipmentInfo.destinationCountryId, //missleading value shoulb be renamed
        addtionalDetails: this.finalData.shipmentInfo.addtionalDetails,
        printproducts:
          this.finalData.shipmentInfo.printProductsInCOO == 'Yes'
            ? true
            : false,
      },
    };

    return requestBody;
  }
}
