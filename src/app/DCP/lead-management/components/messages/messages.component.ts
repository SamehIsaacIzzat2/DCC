import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagesModel } from './messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessagesModel],
})
export class MessagesComponent implements OnInit {
  constructor(public model: MessagesModel,public translateSer:TranslateService) {}

  ngOnInit(): void {}
}
