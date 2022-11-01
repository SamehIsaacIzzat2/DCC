import { Component, OnInit } from '@angular/core';
import { ShipmentInfoModel } from './shipment-info.model';

@Component({
  selector: 'shipment-info',
  templateUrl: './shipment-info.component.html',
  styleUrls: ['./shipment-info.component.scss'],
  providers:[ShipmentInfoModel]
})
export class ShipmentInfoComponent implements OnInit {
  constructor(public model:ShipmentInfoModel) {}

  ngOnInit(): void {}
}
