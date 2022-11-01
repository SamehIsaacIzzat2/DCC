import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  //=======================Data============================
  @Input() clickFlag: boolean;
  @Output() Onclick=new EventEmitter();
  
  @Input() Index:number;
  constructor() { 
  }

  ngOnInit(): void {

  }

  setRate() {
    // this.clickFlag = true;
    this.Onclick.emit(this.Index);
  }

  
}
