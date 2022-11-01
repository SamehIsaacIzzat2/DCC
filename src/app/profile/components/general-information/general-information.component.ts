import { LookupService } from './../../../SharedModule/Services/lookup.service';
import { takeUntil, Subject, BehaviorSubject, combineLatest, switchMap, merge, observable, delay, withLatestFrom, combineLatestAll, zip } from 'rxjs';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GeneralInfo, UserProfile } from '../../interfaces/interfaces';
import { viewCompState } from '../../Enums/edit-components.enum';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit,OnDestroy {
  @Input() stateMode:viewCompState = 1;
  //=========================Data=======================
  public personalData:GeneralInfo;
  public nationalities:any[] = [];
  public titles:any[] = [];
  private endSub$ = new Subject();


  constructor(private authSer:AuthenticationService,private lookupSer:LookupService) {
  }

  ngOnInit(): void {
    this.getLookups();
    this.getCurrentProfile();
  }
  getLookups() {
    const nationalities$ = this.lookupSer.getNatioanlities();
    const titles$ = this.lookupSer.getTitles();
    combineLatest(nationalities$, titles$).pipe(takeUntil(this.endSub$)).subscribe(
      ([nations,titles])=>{
        this.nationalities = nations;
        this.titles = titles;
      }
    )
  }

  getCurrentProfile() {
    let obs$: BehaviorSubject<UserProfile | null>;
    this.getViewAndEditState() ? obs$ = this.authSer.userProfileData$ : obs$ = this.authSer.userProfileEditedData$
    obs$.pipe(takeUntil(this.endSub$)).subscribe(
      (user: UserProfile | null)=>{
        if(user){
          this.personalData = user.generalInfo;
        }
      }
    )
  }

  public getLookup(arr:any[],id:string | undefined){
    if (arr && arr.length > 0 && id) return arr.find((ele: any) => ele.id == id)?.name;
    return "";
  }





  // Component states / modes
  public getViewAndEditState(): boolean {
    return this.stateMode === viewCompState.viewAndEdit
  }
  public getPreviewState(): boolean {
    return this.stateMode === viewCompState.onlyPreview
  }



  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete()
  }

}
