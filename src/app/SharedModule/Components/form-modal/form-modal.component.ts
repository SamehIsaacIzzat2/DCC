import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalService } from './form-modal.service';

@Component({
  selector: 'form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  @Input() id: any;
  @Input() title: string;
  @Input() hideLabel:boolean=false;

  ngOnInit(): void {}
  constructor() {}
}
