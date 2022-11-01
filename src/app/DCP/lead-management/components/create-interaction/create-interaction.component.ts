import { takeUntil } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { CreateInteractionModel } from './create-interaction-model';

@Component({
  selector: 'create-interaction',
  templateUrl: './create-interaction.component.html',
  styleUrls: ['./create-interaction.component.scss'],
  providers: [CreateInteractionModel],
})
export class CreateInteractionComponent implements OnInit,OnDestroy {
  //*******************************************Data************************************************* */
  defaultDate: any = null;
  @Output() CreateInteraction = new EventEmitter();

  constructor(public model: CreateInteractionModel) {
    this.model.CreateInteraction.pipe(takeUntil(this.model.endSub$)).subscribe((item) => {
      this.CreateInteraction.emit(item);
    });
  }


  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.model.endSubs()
  }
}
