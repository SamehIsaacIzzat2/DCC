import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public LANG_KEY = 'lang';
  constructor(private translateSer: TranslateService) { }
  // Get LAnguage From LocalStorage
  public getLangFromLocalStorage(){
    return localStorage.getItem(this.LANG_KEY) || "en";
  }
  // set Language in LocalStorage
  public setLangInLocalStorage(lang:string){
    localStorage.setItem(this.LANG_KEY,lang);
  }
  // toogle Value Based on current lang
  public toggleVal(valEn:string ,valAr:string){
    return this.translateSer.currentLang === 'en' ? valEn : valAr;
  }

  public useLang(lang:string){
    this.translateSer.use(lang);
    document.getElementsByTagName('html')[0].setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    this.setLangInLocalStorage(lang)
  }
}
