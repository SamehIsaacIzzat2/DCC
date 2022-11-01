import { TranslateService } from '@ngx-translate/core';
import { ModalMode } from './../../../../SharedModule/Components/Modal/enums';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';
import { ModalComponent } from 'src/app/SharedModule/Components/Modal/modal.component';
import { bannerSerDetails } from '../banner-service-details/bannerSerDetails.interface';
import { serviceDirectory } from './service-directory.model';

@Component({
  selector: 'app-service-directory',
  templateUrl: './service-directory.component.html',
  styleUrls: ['./service-directory.component.scss'],
  providers: [serviceDirectory],
})
export class ServiceDirectoryComponent implements OnInit {
  banner: iBanner = {
    title: this.translateSer.instant('bannerData.bannerNavigationLinks.services'),
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: '/services' },
      { title: this.translateSer.instant('bannerData.bannerNavigationLinks.services'), link: '/services' },
    ]
  }
  constructor(public model: serviceDirectory, private translateSer:TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {}
  openModel() {
    const dialogRef = this.dialog.open(ModalComponent, {});
    const component = dialogRef.componentInstance;
    (component.data = {
      secondaryActionText: 'back',
      primaryActionText: 'cancel membership',
      text: 'are you sure want to cancel your membership',
    }),
    (component.mode = ModalMode.Confirmation);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
