import { LanguageService } from './../../../../../SharedModule/Services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { compGeneralInfo } from './../../../company-profile/interfaces/company.interface';
import { pluck, take, of, takeUntil, Subject } from 'rxjs';
import { CompanyService } from './../../../company-profile/services/company.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { iBanner } from 'src/app/SharedModule/Components/banner/banner.interface';

@Component({
  selector: 'app-company-add-success',
  templateUrl: './company-add-success.component.html',
  styleUrls: ['./company-add-success.component.scss']
})
export class CompanyAddSuccessComponent implements OnInit, OnDestroy {
  banner: iBanner = {
    breadCrump: [
      { title: this.translateSer.instant('bannerData.breadCrump.home'), link: 'dcc/services' },
      { title: this.translateSer.instant('bannerData.breadCrump.companies'), link: 'dcc/services/companys' },
      { title: this.translateSer.instant('bannerData.breadCrump.addCompany'), link: '' },
    ],
  };
  compName: string = "";
  endSub$ = new Subject();

  item: any = {
    icon: 'done',
    btnConfig: {
      text: this.translateSer.instant('companyModule.success.btnTxt'),
      url: ['dcc/services/companys'],
    },
  }

  constructor(private compSer: CompanyService, private translateSer: TranslateService, private langSer: LanguageService) {
    this.getCompName();
  }

  ngOnInit(): void {
    this.onChangLang()
  }

  private getCompName() {
    this.compSer.companyEditedDetails$.asObservable().pipe(take(1), pluck("generalInfo")).subscribe((res: any) => {
      if (res) {
        this.compName = res.entityName ?? "";
      }
      let mesg = this.langSer.toggleVal(`Company ${this.compName} is added successfully`, `تم إنشاء شركة ${this.compName} بنجاح`)
      this.item = {
        ...this.item,
        // title: of(mesg),
        title: mesg,
      }
      console.log(mesg)
    })
  }
  onChangLang() {
    this.translateSer.onLangChange.pipe(takeUntil(this.endSub$)).subscribe(() => {
      this.getCompName();
    })
  }


  ngOnDestroy(): void {
    this.endSub$.next("")
    this.endSub$.complete()
  }

}
