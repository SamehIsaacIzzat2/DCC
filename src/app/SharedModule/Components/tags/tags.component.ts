import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() SelectedItems: any[];
  @Input() itemName: string;
  @Input() itemNameAr: string = '';
  @Output() onRemoveTag = new EventEmitter();

  constructor(public translateSer:TranslateService) { }

  ngOnInit(): void {
  }

  removeTag(selectedTag:any): void{
    this.onRemoveTag.emit(selectedTag)
  }

}
