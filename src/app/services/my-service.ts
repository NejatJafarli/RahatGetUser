import { Injectable } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

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
    private navCtrl: NavController
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

  user;
  apiKey = 'AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0';
  ApiLink = 'https://user.rahatget.az/api';
  TokenCheck=false;
  async Toast(message) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
