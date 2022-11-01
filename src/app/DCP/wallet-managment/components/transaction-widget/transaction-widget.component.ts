import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'transaction-widget',
  templateUrl: './transaction-widget.component.html',
  styleUrls: ['./transaction-widget.component.scss']
})
export class TransactionWidgetComponent implements OnInit {

  //*******************************************Data******************************************* */
  @Input() item:any;

  constructor() { }

  ngOnInit(): void {
  }

}
