import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddNewConsigneeModel } from './add-new-consignee.model';

@Component({
  selector: 'add-new-consignee',
  templateUrl: './add-new-consignee.component.html',
  styleUrls: ['./add-new-consignee.component.scss'],
  providers: [AddNewConsigneeModel],
})
export class AddNewConsigneeComponent implements OnInit , AfterViewInit,OnChanges {
  @Input() submitted: boolean = false;
  constructor(public model: AddNewConsigneeModel) {}


  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.model.submitted=this.submitted;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.model.submitted=this.submitted;
  }


  ngOnDestroy(): void {
    this.model.endSub$.next('');
    this.model.endSub$.complete();

  }
}
