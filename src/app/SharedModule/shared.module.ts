import { AngularMaterialModule } from './../AngularMaterialModule/angularMaterialModule.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetComponent } from './Components/Widget/widget.component';
import { ModalComponent } from './Components/Modal/modal.component';
import { ModalModel } from './Components/Modal/modal.model';
import { ModalService } from './Components/Modal/modal.service';
import { PersonInfoComponent } from './Components/PersonInfo/personInfo.component';
import { PersonItemComponent } from './Components/PersonItem/personItem.component';
import { TableHeaderComponent } from './Components/TableHeader/tableHeader.component';
import { HighlightSearch } from './Pipes/highlight.pipe';
import { SnackService } from './Services/snack.service';
import { PlatformService } from './Services/platform.service';
import { VerifyComponent } from './Components/Verify/verify.component';
import { SafePipe } from './Pipes/safe.pipe';
import { ColumnSettingsComponent } from './Components/ColumnSettings/columnSettings.component';
import { NgChartsModule } from 'ng2-charts';
import { ImageUploadComponent } from './Components/ImageUpload/imageUpload.component';
import { CapitalSentencePipe } from './Pipes/CapitalSentence.pipe';
import { ToggleColumnsPipe } from './Pipes/FilterColumn.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NumberDirective } from './directives/numbersOnly.directive';
import { MultiImageUploadComponent } from './Components/MultiImageUpload/multiImageUpload.component';
import { MediaUploadComponent } from './Components/MediaUpload/mediaUpload.component';
import { RowWidgetComponent } from './Components/RowWidget/rowWidget.component';
import { InfoCardComponent } from './Components/InfoCard/infoCard.component';
import { CardWidgetComponent } from './Components/CardWidget/cardWidget.component';
import { AccordionItemComponent } from './Components/AccordionItem/accordionItem.component';
import { BannerComponent } from './Components/banner/banner.component';
import { RequestDetailsComponent } from './Components/request-details/request-details.component';
import { ResultCardComponent } from './Components/result-card/result-card.component';
import { RequestStatusCardComponent } from './Components/request-status-card/request-status-card.component';
import { SteeperComponent } from './Components/steeper/steeper.component';
import { RequestWidgetComponent } from './Components/request-widget/request-widget.component';
import { NoDataComponent } from './Components/no-data/no-data.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { ChartComponent } from './Components/chart/chart.component';
import { PaginatorComponent } from './Components/paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StartComponent } from './Components/start/start.component';
import { TagsComponent } from './Components/tags/tags.component';
import { TabsComponent } from './Components/tabs/tabs.component';
import { CompanyInfoComponent } from './Components/company-info/company-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListCardLoaderComponent } from './Components/list-card-loader/list-card-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FileUploadComponent } from './Components/fileUpload/fileUpload.component';
import { DragDirective } from './Components/fileUpload/app-drag.directive';
import { ArReqestStatusPipe } from './Pipes/ar-reqest-status.pipe';
import { CustomDatePipe } from './Pipes/custom-date.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DateTimePickerComponent } from './Components/date-time-picker/date-time-picker.component';
import { GenericDisplayDetailsComponent } from './Components/generic-display-details/generic-display-details.component';
import { TreeTableComponent } from './Components/tree-table/tree-table.component';
import { AccordionPreviewComponent } from './Components/accordion-preview/accordion-preview.component';
import { PreviewAttachmentComponent } from './Components/preview-attachment/preview-attachment.component';
import { ProductDetailsWidgetComponent } from './Components/product-details-widget/product-details-widget.component';
import { ClientAgentChatComponent } from './Components/client-agent-chat/client-agent-chat.component';
import { FormModalComponent } from './Components/form-modal/form-modal.component';
import { DeleteConfirmationPopupComponent } from './Components/delete-confirmation-popup/delete-confirmation-popup.component';
import { PaymentMethodsComponent } from './Components/payment-methods/payment-methods.component';
import { DocumentWidgetComponent } from './Components/document-widget/document-widget.component';
import { PaymentWidgetComponent } from './Components/payment-widget/payment-widget.component';


@NgModule({
  imports: [
    // RouterModule,
    CommonModule,
    AngularMaterialModule,
    NgChartsModule,
    CarouselModule,
    RouterModule,
    NgxIntlTelInputModule,
    NgxPaginationModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    ModalComponent,
    TableHeaderComponent,
    RequestWidgetComponent,
    PersonItemComponent,
    PersonInfoComponent,
    ImageUploadComponent,
    MultiImageUploadComponent,
    WidgetComponent,
    VerifyComponent,
    ColumnSettingsComponent,
    HighlightSearch,
    SafePipe,
    CapitalSentencePipe,
    ToggleColumnsPipe,
    NumberDirective,
    MediaUploadComponent,
    RowWidgetComponent,
    InfoCardComponent,
    CardWidgetComponent,
    AccordionItemComponent,
    BannerComponent,
    RequestDetailsComponent,
    ResultCardComponent,
    SteeperComponent,
    RequestStatusCardComponent,
    NoDataComponent,
    SpinnerComponent,
    ChartComponent,
    PaginatorComponent,
    StartComponent,
    CompanyInfoComponent,
    TagsComponent,
    TabsComponent,
    ListCardLoaderComponent,
    FileUploadComponent,
    DragDirective,
    ArReqestStatusPipe,
    CustomDatePipe,
    DateTimePickerComponent,
    GenericDisplayDetailsComponent,
    TreeTableComponent,
    AccordionPreviewComponent,
    PreviewAttachmentComponent,
    ProductDetailsWidgetComponent,
    ClientAgentChatComponent,
    FormModalComponent,
    DeleteConfirmationPopupComponent,
    PaymentMethodsComponent,
    DocumentWidgetComponent,
    PaymentWidgetComponent,
  ],
  exports: [
    ModalComponent,
    TableHeaderComponent,
    PersonItemComponent,
    PersonInfoComponent,
    RequestWidgetComponent,
    ImageUploadComponent,
    MultiImageUploadComponent,
    WidgetComponent,
    VerifyComponent,
    SteeperComponent,
    ColumnSettingsComponent,
    HighlightSearch,
    SafePipe,
    CapitalSentencePipe,
    ToggleColumnsPipe,
    CarouselModule,
    NumberDirective,
    MediaUploadComponent,
    RowWidgetComponent,
    InfoCardComponent,
    CardWidgetComponent,
    AccordionItemComponent,
    BannerComponent,
    RequestDetailsComponent,
    ResultCardComponent,
    RequestStatusCardComponent,
    NoDataComponent,
    NgxIntlTelInputModule,
    SpinnerComponent,
    ChartComponent,
    PaginatorComponent,
    NgxPaginationModule,
    RouterModule,
    CompanyInfoComponent,
    TagsComponent,
    TabsComponent,
    ListCardLoaderComponent,
    NgxSkeletonLoaderModule,
    FileUploadComponent,
    DragDirective,
    CustomDatePipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DateTimePickerComponent,
    GenericDisplayDetailsComponent,
    TreeTableComponent,
    AccordionItemComponent,
    AccordionPreviewComponent,
    PreviewAttachmentComponent,
    ProductDetailsWidgetComponent,
    ClientAgentChatComponent,
    FormModalComponent,
    DeleteConfirmationPopupComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DateTimePickerComponent,
    PaymentMethodsComponent,
    DocumentWidgetComponent,
    PaymentWidgetComponent
  ],
  entryComponents: [ModalComponent],
  providers: [SnackService, PlatformService, ModalService, ModalModel],
})
export class SharedModule {}
