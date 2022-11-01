import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'accordion-preview-item',
  templateUrl: './accordion-preview.component.html',
  styleUrls: ['./accordion-preview.component.scss'],
})
export class AccordionPreviewComponent implements OnInit, OnChanges {
  //*********************************inputs****************************** */
  @Input() title: string;
  @Input() DetailsItems: any[];
  @Input() expandFlag: boolean = false;
  @Input() hasAttachmentBody = false;
  @Input() itemId: string;
  active: boolean = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['expandFlag']!=null){debugger
      this.active = this.expandFlag;
    }

  }

  ngOnInit(): void {
    this.active = this.expandFlag;
  }

  fun() {debugger
    this.expandFlag = this.active = !this.active;
  }
}
