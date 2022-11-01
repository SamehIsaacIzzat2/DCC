import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-profile-completed-success',
  templateUrl: './profile-completed-success.component.html',
  styleUrls: ['./profile-completed-success.component.scss']
})
export class ProfileCompletedSuccessComponent implements OnInit {
  item: any = {
    icon: 'done',
    title: 'You have successfully updated your profile!',
    btnConfig: {
      text: "Back to Home",
      url: ['/'],
    }
  }
  banner: iBanner = {
    title: this.translateSer.instant('bannerData.breadCrump.editProfile'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translateSer.instant('profileModule.myProfile'), link: '/profile/general' },
      { title: this.translateSer.instant('bannerData.breadCrump.editProfile'), link: '/profile/complete-profile' },

      ],
  };
  constructor(private translateSer:TranslateService) { }

  ngOnInit(): void {
  }

}
