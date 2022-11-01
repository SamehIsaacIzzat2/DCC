import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { IVerifyData } from './iVerifyData';
import { VerifyModel } from './verify.model';


@Component({
  selector: 'verify',
  templateUrl: 'verify.component.html',
  styleUrls: ['verify.component.scss'],
  providers: [VerifyModel]
})

export class VerifyComponent {

  //======Inputs , Outputs , Children =========
  @ViewChild("c1", {static: false}) c1: ElementRef;
  @ViewChild("c2",  {static: false}) c2: ElementRef;
  @ViewChild("counterNum",  {static: false}) counterNum: ElementRef;

  @Input() public resent : boolean = false;
  @Input() public set config(value: IVerifyData) {
    this.model.verifyData = value;
  }
  @Output() public onVerify: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onResend: EventEmitter<void> = new EventEmitter<void>();


  //======Constructor===========================
  constructor(public model: VerifyModel) { 
    this.model.onVerify.subscribe( data => this.onVerify.emit(data));
    this.model.onResend.subscribe( () => this.onResend.emit());
  }

  ngAfterViewInit() {
    // if (this.model.verifyData && this.model.showTimer)
    //   this.startTimer(120);
  }

  // public startTimer(duration: any) {

  //   var timeout = setTimeout(() => {
  //     var time = duration;
  //     var i = 0;
  //     var k = ((i / duration) * 100);
  //     var l = 100 - k;
  //     i++;
  //     this.c1.nativeElement.style.strokeDasharray = [l, k];
  //     this.c2.nativeElement.style.strokeDasharray = [k, l];
  //     this.c1.nativeElement.style.strokeDashoffset = l;
  //     this.counterNum.nativeElement.innerHTML = duration;
  //     var interval = setInterval(() => {
  //       if (i > time) {
  //         clearInterval(interval);
  //         clearTimeout(timeout);
  //         return;
  //       }
  //       k = ((i / duration) * 100);
  //       l = 100 - k;
  //       this.c1.nativeElement.style.strokeDasharray = [l, k];
  //       this.c2.nativeElement.style.strokeDasharray = [k, l];
  //       this.c1.nativeElement.style.strokeDashoffset = l;
  //       this.counterNum.nativeElement.innerHTML = duration - i;
  //       i++;
  //       if (duration - i == -1) {
  //         this.model.isResendDisabled = false;
  //         this.model.showTimer = false;
  //       }
  //     }, 1000);
  //   }, 0);
  // }

  public resend() {
    this.model.onResend.emit();
    this.model.digits.length = 0;
   // this.model.showTimer = true;
  //  this.startTimer(120);
  }

}
