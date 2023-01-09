import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private ToastController:ToastController) { }

  //observable for selected app
  private selectedApp = new BehaviorSubject<string>(localStorage.getItem('selectedApp'));
  selectedApp$ = this.selectedApp.asObservable();

  setValueSelectedApp(value) {
    this.selectedApp.next(value);
    localStorage.setItem('selectedApp',value);
  }

  user;
  apiKey="AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0";
  ApiLink="http://rahatgetapi.test/api";


  async Toast(message) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

}
