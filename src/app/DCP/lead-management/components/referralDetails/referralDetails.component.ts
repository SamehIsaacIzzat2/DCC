import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReferralDetailsModel } from './referralDetails.model';

@Component({
  selector: 'app-referral-details',
  templateUrl: './referralDetails.component.html',
  styleUrls: ['./referralDetails.component.scss'],
  providers: [ReferralDetailsModel],
})
export class ReferralDetailsComponent implements OnInit {

  constructor(public model: ReferralDetailsModel,public translateSer:TranslateService) {}

  ngOnInit(): void {}
}
