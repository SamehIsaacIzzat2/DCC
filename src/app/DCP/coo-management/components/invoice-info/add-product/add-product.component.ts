import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { FormModalService } from 'src/app/SharedModule/Components/form-modal/form-modal.service';
import { ModalService } from 'src/app/SharedModule/Components/Modal/modal.service';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { ProductType } from './productType.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  submitted: boolean = false;
  headerBorder: boolean = true;
  @Output() productData: EventEmitter<ProductType> = new EventEmitter();
  fromTitle: any;
  public endSub$ = new Subject();

  packageTypes: any[];
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private modalService: FormModalService,
    private lookupSer: LookupService,
    private apiSer: APICallerService,
    private activNgbModaleModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.build();
    this.fromTitle = this.translateService.instant(
      'cooModule.invoiceInfo.addProduct'
    );

    this.getSelectData();
  }

  //build
  build() {
    this.addProductForm = this.fb.group({
      typeId: [null, Validators.required],
      typeName: [''],
      H: [null, Validators.required],
      L: [null, Validators.required],
      M: [null, Validators.required],
      quantity: [1, Validators.required],
    });
  }
  isValid: boolean = true;
  get f() {
    return this.addProductForm.controls;
  }
  modelName = 'modal';
  onSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      console.log('not valid');
      return;
    } else {

      const formData = this.addProductForm.value;

      const packagesType = this.packageTypes.filter(
        (item) => item.id == formData.typeId
      )[0].packageTypesNameEnglish;

      const productData: ProductType = {
        typeId: formData.typeId,
        typeName: packagesType,
        size: `${formData.H} * ${formData.L} * ${formData.M}`,
        length: formData.L,
          height: formData.H,
            widtht: formData.M,
        quantity: formData.quantity,
      };
      this.productData.emit(productData);
      this.modalService.hide('addPachageModal');
    }
  }

  //on cancel modal
  onCancel() {
    this.addProductForm.reset();
  }

  //on success
  onSuccess() {
    this.modalService.hide();
    this.addProductForm.reset();
  }

  private getSelectData() {
    this.lookupSer
      .getPackageTypes()
      .pipe(takeUntil(this.endSub$))
      .subscribe((result) => {
        this.packageTypes = result;
      });
  }

}
