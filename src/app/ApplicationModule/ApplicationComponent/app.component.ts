import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import {Component, HostBinding} from '@angular/core'
import {OverlayContainer} from '@angular/cdk/overlay'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  //====================Constructor======================
  constructor(private authSer:AuthenticationService) {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.authSer.setUser(localStorage.getItem("token")!, JSON.parse(localStorage.getItem("user")!))

    }
  }

}
