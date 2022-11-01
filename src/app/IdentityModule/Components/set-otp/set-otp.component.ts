import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SetOtpModel } from './set-otp-model';

@Component({
  selector: 'app-set-otp',
  templateUrl: './set-otp.component.html',
  styleUrls: ['./set-otp.component.scss'],
  providers:[SetOtpModel]
})
export class SetOTPComponent implements OnInit {

  constructor(public model:SetOtpModel) { }

  ngOnInit(): void {
  }

 
}
