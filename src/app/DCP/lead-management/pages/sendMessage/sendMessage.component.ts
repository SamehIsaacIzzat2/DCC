import { Component, OnInit } from '@angular/core';
import { SendMessageModel } from './sendMessage.model';

@Component({
  selector: 'app-send-message',
  templateUrl: './sendMessage.component.html',
  styleUrls: ['./sendMessage.component.scss'],
  providers: [SendMessageModel],
})
export class SendMessageComponent implements OnInit {
  constructor(public model: SendMessageModel) {}

  ngOnInit(): void {}
}
