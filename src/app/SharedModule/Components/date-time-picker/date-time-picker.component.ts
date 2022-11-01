import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { PickerType } from 'ng-pick-datetime/date-time/date-time.class';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnInit {
 @Input()  dpValue: any;
  @Input() H12Timer = true;
  @Input() pickerType: PickerType = 'calendar';
  @Input() placeholder: any;
  @Output() date: EventEmitter<any> = new EventEmitter();
  lang: any;
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.lang = this.langService.getLangFromLocalStorage();
  }

  onChange(event: any) {
    const finalDateFormat = moment(event.value).format();
    this.date.emit(finalDateFormat);
  }
}
