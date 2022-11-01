import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function userNameMatch(regx:RegExp[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let userNameValue: string = control.value;
   
      for(let i=0; i<regx.length ;i++){
        let result=regx[i].test(userNameValue);
        if(result){
          return null;
        }
      }
      return {isMatched:true};
      
    }
  }
  
  