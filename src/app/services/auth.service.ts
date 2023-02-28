import { Injectable } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { ApiService } from './api.service';
import { MyService } from './my-service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private local: StorageService,
    private apiService: ApiService,
    private menuCtrl: MenuController,
    private myService: MyService,
    private navCtrl: NavController
  ) {}

  async isloggedIn() {
    console.log('Init');
    let token = await this.local.getToken();
    //check if user is logged in
    //if token is not null
    if (token != null) {
      console.log('token is not null');
      if (this.myService.TokenCheck == false) {
        let res = await this.apiService.checkToken();
        if (res['message'] == 'success') {
          this.myService.TokenCheck = true;
          if (!this.myService.connected) {
            this.myService.connected = true;
            this.myService.mySocket.connect();
            let userid = 'user' + JSON.parse(await this.local.get('user')).id;
            OneSignal.setExternalUserId(userid);

            this.myService.mySocket.emit('UserConnect', {
              UserId: userid,
            });
            this.myService.user = JSON.parse(await this.local.get('user'));
          }
          return true;
        } else {
          this.local.remove('token');
          this.local.remove('user');
          OneSignal.setExternalUserId(null);

          this.myService.connected = false;
          this.myService.TokenCheck = false;
          this.myService.user = null;

          this.menuCtrl.close();

          this.myService.setValueSelectedApp('');
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.local.remove('token');
      this.local.remove('user');

      this.myService.connected = false;
      this.myService.TokenCheck = false;
      this.myService.user = null;
      OneSignal.setExternalUserId(null);

      this.menuCtrl.close();
      this.myService.setValueSelectedApp('');
      return false;
    }
  }
}
