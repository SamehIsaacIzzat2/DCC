import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletDetailsComponent } from './pages/wallet-details/wallet-details.component';
import { WalletRechargePageComponent } from './pages/wallet-recharge-page/wallet-recharge-page.component';
import { WalletRefundPageComponent } from './pages/wallet-refund-page/wallet-refund-page.component';

const routes: Routes = [
  {path:'',redirectTo:'wallet-details'},
  {path:'wallet-details',component:WalletDetailsComponent},
  {path:'wallet-recharge/:walletId', component:WalletRechargePageComponent},
  {path:'wallet-refund/:companyId/:walletId/:companyBalance',component:WalletRefundPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
