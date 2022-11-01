import { Subject, takeUntil, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { SocialInfo, UserProfile } from '../../interfaces/interfaces';
import { viewCompState } from '../../Enums/edit-components.enum';

@Component({
  selector: 'app-social-information',
  templateUrl: './social-information.component.html',
  styleUrls: ['./social-information.component.scss'],
})
export class SocialInformationComponent implements OnInit {
  //=========================Data=======================
  @Input() stateMode: viewCompState = 1;
  public socialData: SocialInfo;
  private endSub$ = new Subject();
  constructor(private authSer: AuthenticationService) {

  }
  getCurrentProfile() {
    let obs$:BehaviorSubject<UserProfile | null>;
    this.getViewAndEditState() ? obs$ = this.authSer.userProfileData$ : obs$ = this.authSer.userProfileEditedData$
    obs$
      .pipe(takeUntil(this.endSub$))
      .subscribe((user: UserProfile | null) => {
        if (user) {
          this.socialData = user.socialMediaInfo;
        }
      });
  }
  ngOnInit(): void {
    this.getCurrentProfile();
  }

  public getViewAndEditState():boolean{
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }
}
