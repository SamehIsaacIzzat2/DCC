import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { ForgetPasswordModel } from './forget-password-model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[ForgetPasswordModel]
})
export class ForgetPasswordComponent implements OnInit {



  constructor(public model:ForgetPasswordModel,public langSer:LanguageService) { }

  ngOnInit(): void {

  }


}
