import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Step } from './iStepper.interface';

@Component({
  selector: 'steeper',
  templateUrl: './steeper.component.html',
  styleUrls: ['./steeper.component.scss'],
})
export class SteeperComponent implements OnInit , OnChanges{
  @Input()
  steps!: Step[];
  @Input()
  hideCancel: boolean= false;
  @Input()
  activeStep: number = 1;
  @Input()
  submitStep: number = -1;
  @Input()
  isPaid: boolean = false;
  @Input() hideActions:boolean;
  @Input() createRequestStyleFlag:boolean=false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancleEvent: EventEmitter<any> = new EventEmitter();
  @Output() nextStepEvent: EventEmitter<any> = new EventEmitter();
  @Output() editFormEvent: EventEmitter<any> = new EventEmitter();
  @Output() backFormEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveAsDraftFormEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {}

  public submit(isdraft:boolean) {
    this.submitEvent.emit(isdraft);
  }

  public nextStep() {
    this.nextStepEvent.emit();
  }
  // public draftForm() {
  //   this.saveAsDraftFormEvent.emit();
  // }
  public cancelForm() {
    // if (this.activeStep != 1){
    //   this.activeStep = 1;
    //   this.editFormEvent.emit();
    // }
    this.cancleEvent.emit();
  }

  public getActiveStepTitle():string{
    return this.steps.filter(step=>step.stepIndex==this.activeStep)[0]?.stepTitle;
  }

  backForm(){
    if (this.activeStep != 1) {
      this.activeStep = this.activeStep - 1;
      this.backFormEvent.emit();
    }
  }

  public cancle(){
   this.cancleEvent.emit();
  }


  // }
}
