import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { RegisterFormModel } from './registerForm.model';
import { createMask } from '@ngneat/input-mask';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';

@Component({
  selector: 'register-form',
  templateUrl: 'registerForm.component.html',
  styleUrls: ['registerForm.component.scss'],
  providers: [RegisterFormModel]
})

export class RegisterFormComponent implements OnDestroy,OnInit {
  Idval = '';
  // public emiratesIdInputMask:any = createMask('999-9999-9999999-9');
  public emiratesIdInputMask:any = createMask({
    placeholder: "784-XXXX-XXXXXXX-X",
    // regex: '[7-7]{1}[8-8]{1}[4-4]{1}-[0-9]{4}-[0-9]{7}-[0-9]{1}$',
    regex: '[7-7]{1}[8-8]{1}[4-4]{1}-$[0-9]{4}-[0-9]{7}-[0-9]{1}$',
    inputType: "number"
  });
  filteredOptions: Observable<any[]>;

  item: any = {
    icon: 'done',
    title: this.translateSer.instant("registration.success.youHaveSuccessfullyRegistered"),
    btnConfig: {
      text: this.translateSer.instant("registration.success.viewRequests"),
      url: "/requests",
    }
  }

  constructor(public model: RegisterFormModel,public langSer:LanguageService,private translateSer:TranslateService) { }

  ngOnInit(): void {

    this.filteredOptions = this.model.registerForm.controls['nationality'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.nationalities, value || '')),
    );

  }


  visitFeild(data:any){
    if(data==''){
      this.Idval='784';
    }else{
      this.Idval=data;
    } 

  }
   // clear EmirateId Feild if user only touch it without enterning numbers

   checkFeildContent(data:any){
    if(data=="784"){
      this.Idval='';
    } 
    else{
      this.Idval=data;
    }

  }

  ngOnDestroy(): void {
    this.model.endSubs();
  }

  displayWith(obj?: any): string {
    return obj ? obj.name : '';
  }

  private _filter(arr: any[], value: any): string[] {
    if(typeof(value)==='string'){
      const filterValue = value.toLowerCase();
      return arr.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    return [];

  }


}
