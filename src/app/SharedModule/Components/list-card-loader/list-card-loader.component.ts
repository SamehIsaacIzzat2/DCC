import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-loader',
  templateUrl: './list-card-loader.component.html',
  styleUrls: ['./list-card-loader.component.scss'],
})
export class ListCardLoaderComponent implements OnInit {
  @Input() height = 200;
  constructor() {}

  ngOnInit(): void {}
}
