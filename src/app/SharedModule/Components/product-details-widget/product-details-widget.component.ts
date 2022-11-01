import { Component, Input, OnInit } from '@angular/core';
import { ProductDetails } from '../../../DCP/coo-management/components/preview/Interfaces/Products';

@Component({
  selector: 'product-details-widget',
  templateUrl: './product-details-widget.component.html',
  styleUrls: ['./product-details-widget.component.scss']
})
export class ProductDetailsWidgetComponent implements OnInit {

  //******************************InputData***************************** */
  @Input() item:ProductDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
