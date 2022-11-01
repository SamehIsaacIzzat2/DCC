import { Component, OnInit } from '@angular/core';
import { MessagesModel } from './messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers:[MessagesModel]
})
export class MessagesComponent implements OnInit {

  constructor(public model:MessagesModel) { }

  ngOnInit(): void {
  }

}
