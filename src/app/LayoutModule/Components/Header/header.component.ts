import { Component } from '@angular/core';
import { HeaderModel } from './header.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderModel]
})

export class HeaderComponent {

  constructor(public model: HeaderModel) { }

}
