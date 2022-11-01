import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  @Output() actionType: EventEmitter<any> = new EventEmitter();
  public selectedItem = '';

  //*******************************************Recharge wallet************************************ */

  constructor() { }

  ngOnInit(): void {
  }

  onActionType(actionType:string){
    this.selectedItem=actionType;
    console.log(actionType);
    this.actionType.emit(actionType)
  }

}

