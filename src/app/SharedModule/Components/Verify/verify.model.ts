import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GuidService } from '../../Services/Guid.service';
import { SnackService } from '../../Services/snack.service';
import { IVerifyData } from './iVerifyData';

@Injectable()
export class VerifyModel {

  public hasDigits: boolean = false;
  public isResendDisabled: boolean = true;
  public id : string = GuidService.create();
  public data: string;
  public verifyData: IVerifyData = {} as IVerifyData;
  public focus: number = -1;
  public showTimer: boolean = true;
  public loops = [1, 2, 3, 4];
  public digits: Array<String> = ["", "", "", ""];

  public onVerify: EventEmitter<string> = new EventEmitter<string>();
  public onResend: EventEmitter<void> = new EventEmitter<void>();

  constructor(private snackService: SnackService, private router: Router) { }

  public setFocus(i: any) {
    this.focus = i;
  }

  public verify() {
    if(this.data)
      this.onVerify.emit(this.data);
    else
      this.snackService.snack("Verification is failed");
  }

  public blur(i: any, event: any) {
    this.data = this.digits.join('');
    if (i != 3)
      document.getElementById(`txt_${i + 1}_ver${this.id}`)?.focus();
    else {
      document.getElementById(`txt_${i}_ver${this.id}`)?.blur();
      this.focus = -1;
    }

    let key = event.keyCode || event.charCode;

    if( key == 8 || key == 46 ) 
      document.getElementById(`txt_${i - 1}_ver${this.id}`)?.focus();
      this.onVerify.emit(this.data);
  }

}
