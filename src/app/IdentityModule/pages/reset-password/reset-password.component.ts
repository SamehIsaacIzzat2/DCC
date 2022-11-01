import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './reset-password-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers:[ResetPasswordModel]
})
export class ResetPasswordComponent implements OnInit {

  constructor(public model:ResetPasswordModel) { }

  ngOnInit(): void {
  }

}
