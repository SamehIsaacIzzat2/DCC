import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  @Input() item: string;

  constructor() { }

  ngOnInit(): void {
  }

}
