import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tree } from './tree-table.interface';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
})
export class TreeTableComponent implements OnInit {
  public invoiceDetailIndex: any;
  public productIndex: any;
  @Input() data: Tree[];

  @Output() DeletePackage: EventEmitter<any> = new EventEmitter<any>();
  @Output() addNewPackage: EventEmitter<any> = new EventEmitter<any>();
  @Input() previewMode: boolean=false;
  
  constructor() {}

  ngOnInit(): void {}

  //add new package
  addPackage(index: any) {
    this.addNewPackage.emit(index);
  }

  //on click delete
  onDeleteProduct(index: any, productIndex: any) {
    this.invoiceDetailIndex = index;
    this.productIndex = productIndex;
  }

  //on confirm delete
  confirmDelete() {
    let data = {
      index: this.invoiceDetailIndex,
      productIndex: this.productIndex,
    };
    this.DeletePackage.emit(data);
  }
}
