import { Component, OnInit } from '@angular/core';
import { DocumentModel } from './document.model';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
  providers:[DocumentModel]
})
export class DocumentsPageComponent implements OnInit {

  

  constructor(public model:DocumentModel) { }

  ngOnInit(): void {
  }

}
