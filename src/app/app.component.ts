import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { MyService } from './services/my-service';
import OneSignal from 'onesignal-cordova-plugin';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE
    // OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId('2ea6c1f9-4174-4ee3-b8d6-b2f397629dc4');
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted);
    });
  }
  selected;
  public appPages = [];
  @ViewChild('SplitPane') SplitPane;
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    public service: MyService,
    private http: HttpClient,
    private navCtrl: NavController,
    private platform: Platform,
    private apiService: ApiService,
    private local: StorageService
  ) {}
  //ng on init
  async ngOnInit() {
    await this.local.init();
    await this.service.init();

    // platform.ready().then(() => {
    //   this.OneSignalInit();
    // });

    // //check if activeorder have send home page step 5
    // if (localStorage.getItem('activeOrder') != null) {
    //   this.router.navigate(['/home/'+JSON.parse(localStorage.getItem('activeOrder')).step]);
    // }
    //get value selectedapp
    this.service.selectedApp$.subscribe((data) => {
      this.selected = data;
    });
  }
  home() {
    this.router.navigate(['/home']);
    this.menuCtrl.close();
  }
  addcar() {
    this.router.navigate(['/addcar']);
    this.menuCtrl.close();
  }
  depatures() {
    this.router.navigate(['/departures']);
    this.menuCtrl.close();
  }
  paymentmethods() {
    this.router.navigate(['/paymentmethods']);
    this.menuCtrl.close();
  }
  myinfo() {
    this.router.navigate(['/myinfo']);
    this.menuCtrl.close();
  }
  promocode() {
    this.router.navigate(['/promocode']);
    this.menuCtrl.close();
  }
  myaddress() {
    this.router.navigate(['/myaddress']);
    this.menuCtrl.close();
  }
  help() {
    this.router.navigate(['/help']);
    this.menuCtrl.close();
  }
  notifications() {
    this.router.navigate(['/notification']);
    this.menuCtrl.close();
  }

  evohome() {
    this.router.navigate(['/evohome']);
    this.menuCtrl.close();
  }
  evomyinfo() {
    this.router.navigate(['/evomyinfo']);
    this.menuCtrl.close();
  }
  evodepartures() {
    this.router.navigate(['/evodepartures']);
    this.menuCtrl.close();
  }
  evonotification() {
    this.router.navigate(['/evonotification']);
    this.menuCtrl.close();
  }
  evopaymentmethods() {
    this.router.navigate(['/evopaymentmethods']);
    this.menuCtrl.close();
  }

  evopromocode() {
    this.router.navigate(['/evopromocode']);
    this.menuCtrl.close();
  }
  evohelp() {
    this.router.navigate(['/evohelp']);
    this.menuCtrl.close();
  }
  // evohome() {
  //   this.router.navigate(['/evohome']);
  //   this.menuCtrl.close();
  // }
  changeToRahatGet() {
    this.menuCtrl.close();
    this.local.set('selectedApp', 'ayig');
    this.router.navigate(['/home'], { state: { reload: true } });
  }
  changeToEvo() {
    //reload page

    this.menuCtrl.close();
    this.local.set('selectedApp', 'evo');
    this.router.navigate(['/evohome'], { state: { reload: true } });
  }
  async logout() {
    //send logout request
    await this.apiService.logout();
    // OneSignal.setExternalUserId(null);

    //PROBLEM HERE

    this.menuCtrl.close();
    document
      .getElementById('main-content')
      .classList.remove('menu-content-open');
    //PROBLEM HERE

    this.service.setValueSelectedApp('');

    this.navCtrl.navigateRoot(['./login']);
  }
}
