import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AttachmentsModel } from './attachments-membership.model';

@Component({
  selector: 'attachments-membership',
  templateUrl: './attachments-membership.component.html',
  styleUrls: ['./attachments-membership.component.scss'],
  providers:[AttachmentsModel]
})
export class AttachmentsMembershipComponent implements OnInit {
  constructor(public model:AttachmentsModel) {}

  ngOnInit(): void {
  
  
  }


}
