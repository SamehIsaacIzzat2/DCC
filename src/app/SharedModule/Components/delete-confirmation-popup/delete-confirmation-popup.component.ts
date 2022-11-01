import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.scss']
})
export class DeleteConfirmationPopupComponent implements OnInit {

  //********************************Inputs************************** */
  @Input() popUpId:string;

  //********************************Outputs************************** */

  @Output() Delete:EventEmitter<any>=new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    // let myModal=document.getElementById(this.popUpId)as HTMLElement;
    // myModal.style.display="none";
    this.Delete.emit();
  }

 

}
