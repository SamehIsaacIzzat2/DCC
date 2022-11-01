import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { ContactInfo, UserProfile } from '../../interfaces/interfaces';
import { viewCompState } from '../../Enums/edit-components.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditContactInformationModel } from '../edit-contact-information/edit-contact-information-model';
@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
  providers: [EditContactInformationModel]
})
export class ContactInformationComponent implements OnInit {
  //=========================Data=======================
  contactData: ContactInfo;
  @Input() stateMode: viewCompState = 1;
  private endSub$ = new Subject();
  phoneForm = new FormGroup({
		mobileNumber: new FormControl(undefined, [Validators.required]),
    officeNumber: new FormControl(undefined, [Validators.required]),
    workNumber: new FormControl(undefined, [Validators.required])
	});
  constructor(private authSer: AuthenticationService,public model: EditContactInformationModel) {

  }

  getCurrentProfile() {
    let obs$: BehaviorSubject<UserProfile | null>;
    this.getViewAndEditState() ? obs$ = this.authSer.userProfileData$ : obs$ = this.authSer.userProfileEditedData$
    obs$
      .pipe(takeUntil(this.endSub$))
      .subscribe((user: UserProfile | null) => {
        if (user) {
          this.contactData = user.contactInfo;
          this.phoneForm.controls.mobileNumber.setValue(this.contactData.mobileNumber);
          this.phoneForm.controls.officeNumber.setValue(this.contactData.officeNumber);
          this.phoneForm.controls.workNumber.setValue(this.contactData.workNumber);
          this.phoneForm.controls.mobileNumber.disable();
          this.phoneForm.controls.officeNumber.disable();
          this.phoneForm.controls.workNumber.disable();
        }
      });
  }

  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }

  ngOnInit(): void {
    this.getCurrentProfile();
  }
}
