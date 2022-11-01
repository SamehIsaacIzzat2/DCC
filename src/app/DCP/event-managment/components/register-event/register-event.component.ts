import { Component, OnInit } from '@angular/core';
import { Observable ,startWith,map} from 'rxjs';
import { RegisterEventModel } from './register-event.model';

@Component({
  selector: 'register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss'],
  providers:[RegisterEventModel]
})
export class RegisterEventComponent implements OnInit {

  //***************************************Data**************************************** */
  filteredOptions: Observable<any[]>;
  constructor(public model:RegisterEventModel) { }

  ngOnInit(): void {

    this.filteredOptions = this.model.registerForm.controls['nationality'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.model.nationalities, value || '')),
    );
    this.filteredOptions.subscribe(res=>{
      console.log(res)
    })
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
