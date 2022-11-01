import { Component } from '@angular/core';
import { InfoCardModel } from './infoCard.model';

@Component({
  selector: 'info-card',
  templateUrl: 'infoCard.component.html',
  styleUrls: ['infoCard.component.scss'],
  providers: [InfoCardModel]
})

export class InfoCardComponent {

  constructor(public model: InfoCardModel) { }
}
