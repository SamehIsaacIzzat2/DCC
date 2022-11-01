import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../Services/language.service';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe  implements PipeTransform {

  constructor(private langSer:LanguageService ){

  }
  transform(date:any, format:any): string | any{

    // 'UTC'

    return new DatePipe(this.langSer.toggleVal('en-US','ar-EG-u-nu-latn')).transform(date,format,undefined,this.langSer.toggleVal('en-US','ar-EG-u-nu-latn'));
  }
    
}