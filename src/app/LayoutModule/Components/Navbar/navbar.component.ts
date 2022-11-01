import { LanguageService } from './../../../SharedModule/Services/language.service';
import { AuthenticationService } from './../../../CallerModule/Services/authentication.service';
import { Component } from '@angular/core';
import { NavbarModel } from './navbar.model';
import { Router } from '@angular/router';
import { PlatformService } from './../../../SharedModule/Services/platform.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NavbarModel],
})
export class NavbarComponent {
  constructor(
    public model: NavbarModel,
    private route: Router,
    public authSer: AuthenticationService,
    public langSer: LanguageService,
    public platformSer:PlatformService
  ) {}

  public angel=0;
  public state=false;

  public rotate(){
    this.angel=Math.abs(this.angel-90);
  }

  public toggle(){
    this.state = !this.state;
  }

  login(){
    this.route.navigate(["/"+this.platformSer.getPlatform()+"/identity/login"]);
  }

  logout(){
    this.authSer.signOut();
  }

}
