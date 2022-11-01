import { TranslateModule } from '@ngx-translate/core';
import { ServicesCatalogModule } from './../DCP/services-catalog/services-catalog.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../AngularMaterialModule/angularMaterialModule.module';
import { SharedModule } from '../SharedModule/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './Components/Header/header.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';
import { NavItemsComponent } from './Components/NavItems/navItems.component';
import { NavItemComponent } from './Components/NavItem/navItem.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { LayoutComponent } from './Components/Layout/layout.component';
import { IdentityModule } from '../IdentityModule/identity.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    LayoutRoutingModule,
    SharedModule,
    ServicesCatalogModule,TranslateModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    NavItemsComponent,
    NavItemComponent,
    FooterComponent,
  ],
  exports:[
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    NavItemsComponent,
    NavItemComponent,
    FooterComponent
  ],
  // providers: [ TitleService]
})

export class LayoutModule {}
