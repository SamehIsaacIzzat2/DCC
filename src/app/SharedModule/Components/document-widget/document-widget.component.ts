import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentDataModel } from 'src/app/DCP/membership-managment/pages/documents-page/Interfaces/Documnet';
import { ViewChild,ElementRef,ViewChildren,QueryList,Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'document-widget',
  templateUrl: './document-widget.component.html',
  styleUrls: ['./document-widget.component.scss']
})
export class DocumentWidgetComponent implements OnInit {

  //*******************************************Inputs & outputs******************************************* */
  @Input() item:DocumentDataModel;
  @Output() Download:EventEmitter<any>=new EventEmitter<any>();
  @ViewChild('download') download:ElementRef;

  constructor(public _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  downloadFile(){
    this.download.nativeElement.click();
  }

}
