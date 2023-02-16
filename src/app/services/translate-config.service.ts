import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  private _defaultLanguage: string = 'az';
  private language: string = 'az';
  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {}

  getDefaultLanguage() {
    let language = this.translate.getBrowserLang();
    if (language != null) {
      this.translate.setDefaultLang(language);
    } else {
      this.translate.setDefaultLang(this._defaultLanguage);
    }
    return language;
  }
  setLanguage(setLang: string) {
    this.language = setLang;
    this.translate.use(setLang);
    this.storage.set('def_lang', setLang);
  }

  getLanguage() {
    return this.language;
  }
}
