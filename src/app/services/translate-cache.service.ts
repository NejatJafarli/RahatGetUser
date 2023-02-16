import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateCacheService {

  cache: any = {};
  constructor(private translate: TranslateService) { }


  initCache(){
    this.cache = {};
  }
  clearCache(){
    this.cache = {};
  }

  async get(key:string){
    if(this.cache[key] == undefined){
      this.cache[key] = await this.translate.get(key).toPromise();
    } 
    return this.cache[key];
  }

}