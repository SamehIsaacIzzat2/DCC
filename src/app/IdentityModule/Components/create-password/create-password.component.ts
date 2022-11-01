import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { CreatePasswordModel } from './create-password-model';

@Component({
  selector: 'create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss'],
  providers:[CreatePasswordModel]
})
export class CreatePasswordComponent implements OnInit {

  //===========================Data=============================

  @Input()  resetPasswordFlag:boolean;
  @Output() OnSubmit=new EventEmitter();
  specialCharacter:string='At least one (1) special character ~ ! @ # $ % ^ * - _ = + [ { ] }'
  constructor( public model:CreatePasswordModel,public langSer:LanguageService) {
    this.model.OnSubmit.subscribe((item)=>this.OnSubmit.emit(item));

   }

  ngOnInit(): void {
    this.model.resetPassword=this.resetPasswordFlag;

  }

}
