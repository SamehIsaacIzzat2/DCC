import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateValidators {
  constructor() {}

  public static future(control: FormControl) {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  public static presentOrPast(control: FormControl) {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (!date.isBefore(today)) {
        return { future: true };
      }
    }
    return null;
  }

  public static notOlderThan(days: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const date = moment(control.value);
        const today = moment();
        const daysDiff = this.dateDiffInDays(date.toDate(), today.toDate());
        if (daysDiff > days) {
          return { older: true };
        }
      }
      return null;
    };
  }
  private static dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
