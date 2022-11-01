import { Component, OnInit } from '@angular/core';
import { AttachmentsModel } from './attachments.model';

@Component({
  selector: 'attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  providers:[AttachmentsModel]
})
export class AttachmentsComponent implements OnInit {
  constructor(public model:AttachmentsModel) {}

  ngOnInit(): void {}
}
