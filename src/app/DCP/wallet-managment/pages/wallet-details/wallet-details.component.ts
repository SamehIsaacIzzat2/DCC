import { Component, OnInit } from '@angular/core';
import { WalletModel } from './wallet.model';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss'],
  providers:[WalletModel]
})
export class WalletDetailsComponent implements OnInit {
  



  constructor(public model:WalletModel) { }

  ngOnInit(): void {
  }

}
