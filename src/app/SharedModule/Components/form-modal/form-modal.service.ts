import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var bootstrap: any;
@Injectable({
  providedIn: 'root',
})
export class FormModalService {
  @ViewChild('dismissModal') dismissModal: ElementRef;

  constructor(private ngbModel: NgbModal) {}

  show(customModal?: any) {
    let showModel = new bootstrap.Modal(document.getElementById(customModal), {
      keyboard: false,
    });
    showModel.show();
  }

  hide(customModal?: any) {
    // debugger
    // let hideModel = new bootstrap.Modal(document.getElementById(customModal), {
    //   keyboard: false,
    // });
    // hideModel.hide();

    if(customModal){
      document.getElementById(customModal)?.click();
    }else{
    document.getElementById('dismissModal')?.click();
    }
  }
}
