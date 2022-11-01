import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'arStatus'
})
export class ArReqestStatusPipe implements PipeTransform {

  constructor(private translate: TranslateService) {

  }

  transform(value: string, ...args: any[]): string {

    if (value === 'draft') {
      return this.translate.instant("shared.generalWord.draft")
    } else if (value === 'submitted') {
      return this.translate.instant("shared.generalWord.submitted")
    } else if (value === 'open' || value === 'pending' || value === 'Pending' ) {
      return this.translate.instant("shared.generalWord.open")
    } else if (value === 'closed') {
      return this.translate.instant("shared.generalWord.closed")
    } else {
      return ""
    }

    // console.log(value)
    // return null;
  }

}
