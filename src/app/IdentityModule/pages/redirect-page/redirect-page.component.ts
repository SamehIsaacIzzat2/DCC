import { Component, OnInit } from '@angular/core';
import { RedirectModel } from './redirect-model';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss'],
  providers:[RedirectModel]
})
export class RedirectPageComponent implements OnInit {

  constructor(public model:RedirectModel) { }

  ngOnInit(): void {
  }

}
