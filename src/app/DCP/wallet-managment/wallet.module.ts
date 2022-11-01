import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { CompanyWalletBalanceComponent } from './components/company-wallet-balance/company-wallet-balance.component';
import { TransactionWidgetComponent } from './components/transaction-widget/transaction-widget.component';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WalletRechargePageComponent } from './pages/wallet-recharge-page/wallet-recharge-page.component';
import { WalletDetailsComponent } from './pages/wallet-details/wallet-details.component';
import { RechargeWalletComponent } from './components/recharge-wallet/recharge-wallet.component';
import { RefundWalletComponent } from './components/refund-wallet/refund-wallet.component';
import { WalletRefundPageComponent } from './pages/wallet-refund-page/wallet-refund-page.component';


@NgModule({
  declarations: [
    WalletDetailsComponent,
    RechargeWalletComponent,
    CompanyWalletBalanceComponent,
    TransactionWidgetComponent,
    WalletRechargePageComponent,
    RefundWalletComponent,
    WalletRefundPageComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class WalletModule { }
