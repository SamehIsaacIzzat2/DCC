import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PreviewModel } from './preview.model';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  providers: [PreviewModel],
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input() previewData: any;
  constructor(public model: PreviewModel) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.model.previewData = this.previewData;
   // console.log( "products",this.model.previewData?.invoiceInfo?.products)
  }

  ngOnInit(): void {}
}
