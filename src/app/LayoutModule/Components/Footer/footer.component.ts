import { Component } from '@angular/core';
import { FooterModel } from './footer.model';
import { LanguageService } from './../../../SharedModule/Services/language.service';
import { PlatformService } from './../../../SharedModule/Services/platform.service';
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [FooterModel]
})

export class FooterComponent {

  constructor(public model: FooterModel,public langSer: LanguageService,public platformSer:PlatformService) { }

}
