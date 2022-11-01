import { Component, OnInit } from '@angular/core';
import { NewMessageModel } from './new-message.model';

@Component({
  selector: 'app-new-message-page',
  templateUrl: './new-message-page.component.html',
  styleUrls: ['./new-message-page.component.scss'],
  providers:[NewMessageModel]
})
export class NewMessagePageComponent implements OnInit {

  constructor(public model:NewMessageModel) { }

  ngOnInit(): void {
  }

}
