import { Component, OnInit } from '@angular/core';
import { NewMessageModel } from './new-message.model';

@Component({
  selector: 'memberShip-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
  providers:[NewMessageModel]
})
export class NewMessageComponent implements OnInit {

  constructor(public model:NewMessageModel) { }

  ngOnInit(): void {
  }

}
