import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  public mySocket;
  constructor(
    private ToastController: ToastController,
    private Socket: Socket,
    private local: StorageService
  ) {
    this.mySocket = Socket;
    this.init();
  }
  async init() {
    this.selectedApp ==
      new BehaviorSubject<string>(await this.local.get('selectedApp'));
    this.selectedApp$ = this.selectedApp.asObservable();
  }
  //observable for selected app
  private selectedApp;
  selectedApp$;

   setValueSelectedApp(value) {
    this.selectedApp.next(value);
    this.local.set('selectedApp', value);
  }

  user;
  apiKey = 'AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0';
  ApiLink = 'http://rahatgetapi.test/api';

  async Toast(message) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
