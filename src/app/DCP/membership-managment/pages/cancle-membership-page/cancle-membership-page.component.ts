import { Component, OnInit } from '@angular/core';
import { CancleMembershipModel } from './cancle-membership.model';
import { LanguageService } from '../../../../SharedModule/Services/language.service';

@Component({
  selector: 'app-cancle-membership-page',
  templateUrl: './cancle-membership-page.component.html',
  styleUrls: ['./cancle-membership-page.component.scss'],
  providers:[CancleMembershipModel]
})
export class CancleMembershipPageComponent implements OnInit {

  constructor(public model:CancleMembershipModel,public langSer: LanguageService) { }

  ngOnInit(): void {
  }

}
