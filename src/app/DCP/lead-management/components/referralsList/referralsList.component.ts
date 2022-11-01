import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReferralsListModel } from './referralsList.model';

@Component({
  selector: 'app-referrals-list',
  templateUrl: './referralsList.component.html',
  styleUrls: ['./referralsList.component.scss'],
  providers: [ReferralsListModel],
})
export class ReferralsListComponent implements OnInit {
  constructor(public model: ReferralsListModel,public translateSer:TranslateService) {}

  ngOnInit(): void {}
}
