import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router,NavigationEnd } from '@angular/router';
import { PlatformService } from '../../SharedModule/Services/platform.service';
@Injectable()
export class DICGuard implements CanActivate {
  constructor(
    private platformSer: PlatformService,
    private router: Router,
    private snakSer: SnackService
  ) {}

  //=======Services ==============
  async canActivate() {
    this.platformSer.getPlatformAsync().subscribe((val:any)=>{
      if(val instanceof NavigationEnd){
        if (this.platformSer.getPlatform()!="dic") {
          this.snakSer.snack('Can access this page only through DIC!');
          this.router.navigateByUrl('/dcc/services');
          return false;
        }
        return true;
      }
    });
    return true;
  }

}
