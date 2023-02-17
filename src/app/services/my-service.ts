import { Injectable } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { TranslateCacheService } from './translate-cache.service';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(
    private ToastController: ToastController,
    public mySocket: Socket,
    private local: StorageService,
    private apiService: ApiService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private translate: TranslateCacheService,
  ) {}
  async init() {
    this.selectedApp = new BehaviorSubject<string>(
      await this.local.get('selectedApp')
    );

    this.selectedApp$ = this.selectedApp.asObservable();
    this.user = JSON.parse(await this.local.get('user'));
  }
  //observable for selected app
  public connected=false;
  private selectedApp;
  selectedApp$;
  getValueSelectedApp() {
    return this.selectedApp.getValue();
  }
  setValueSelectedApp(value) {
    this.selectedApp.next(value);
    this.local.set('selectedApp', value);
  }
  
  handleErrors(res) {
    if (res['error']) {
      let errors = res['error']['errors'];
      let message = '';
      //get the first error
      for (let key in errors) {
        message = errors[key][0];
        break;
      }
      this.Toast(message);
      return true;
    }
    return false;
  }
  myGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    )
  }

  user;
  apiKey = 'AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0';
  ApiLink = 'https://user.rahatget.az/api';
  TokenCheck=false;
  async Toast(message) {
    message=this.translate.get(message);
    const toast = await this.ToastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
  getTranslate(value){
    return this.translate.get(value);
  }
  getCurrentLang(){
    return this.local.get('def_lang');
  }
}
