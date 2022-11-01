import { Component, OnInit } from '@angular/core';
import { MyProfileModel } from './my-profile-model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers:[MyProfileModel]
})
export class MyProfileComponent implements OnInit {
  
  constructor( public model:MyProfileModel) { }

  ngOnInit(): void {
  }

}
