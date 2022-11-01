import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IRequestData } from './iReuestData';
import { RequestWidgetModel } from './request-widget.model';

@Component({
  selector: 'request-widget',
  templateUrl: './request-widget.component.html',
  styleUrls: ['./request-widget.component.scss'],
  providers:[RequestWidgetModel]
})
export class RequestWidgetComponent implements OnInit {
  @Input() item: IRequestData;
  @Input() showIndetails: boolean=true;
  @Input() status:number;
  @Output() OnClick:EventEmitter<any>=new EventEmitter<any>();

  constructor(public model:RequestWidgetModel) { 
   
  }

  ngOnInit(): void {
  }

  goToDetails(){
    this.OnClick.emit();
  }

}
