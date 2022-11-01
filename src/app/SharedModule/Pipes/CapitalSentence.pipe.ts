import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalSentence'
})

export class CapitalSentencePipe implements PipeTransform {

  transform(text: any): any {
      return  text.split(/(?=[A-Z])/).join(' ');
  }

}
