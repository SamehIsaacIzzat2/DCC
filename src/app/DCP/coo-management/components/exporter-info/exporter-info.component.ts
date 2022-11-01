import { Component, OnInit } from '@angular/core';
import { ExporterInfoModel } from './exporter-info.model';

@Component({
  selector: 'exporter-info',
  templateUrl: './exporter-info.component.html',
  styleUrls: ['./exporter-info.component.scss'],
  providers: [ExporterInfoModel],
})
export class ExporterInfoComponent implements OnInit {
  constructor(public model: ExporterInfoModel) {}

  ngOnInit(): void {}
}
