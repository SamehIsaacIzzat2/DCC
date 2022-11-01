import { LanguageService } from './../SharedModule/Services/language.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from '../AngularMaterialModule/angularMaterialModule.module';
import { CallerModule } from '../CallerModule/caller.module';
import { SharedModule } from '../SharedModule/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './ApplicationComponent/app.component';
import { AgmCoreModule } from '@agm/core';
import { InputMaskModule } from '@ngneat/input-mask';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeAR from '@angular/common/locales/ar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../CallerModule/Services/config-service.service';


export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    CallerModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCy3lkvynJ0Uvafs0fdzTUxP7K7pCwWWsA',
      libraries: ['geometry', 'places']
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    NgbModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
	
    //LoaderService,
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private langSer:LanguageService){
    // setting site current language
    langSer.useLang(langSer.getLangFromLocalStorage())
    registerLocaleData(localeAR,'ar-EG-u-nu-latn');
  }
 }

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

