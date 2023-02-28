import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { MyService } from './services/my-service';
import OneSignal from 'onesignal-cordova-plugin';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { runInThisContext } from 'vm';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from './services/translate-config.service';

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
    private local: StorageService,
    private auth: AuthService,
    private translate: TranslateService,
    public translateConfigService: TranslateConfigService
  ) {}
  SelectedLang;
  selectLang() {
    this.translateConfigService.setLanguage(this.SelectedLang);
  }
  //ng on init
  async ngOnInit() {
    this.translate.setDefaultLang('az');
    this.translate.addLangs(['az', 'en', 'ru']);
    await this.local.init();
    // await this.local.remove('def_lang');
    this.local.get('def_lang')?.then((res) => {
      if (res) {
        this.translate.use(res);
        this.SelectedLang = res;
      } else {
        this.translate.use('az');
        this.SelectedLang = 'az';
      }
    });
    await this.service.init();
    //remove
    // let active = await this.local.get('activeRezerv');

    console.log(JSON.parse(await this.local.get('activeOrder')));
    console.log(JSON.parse(await this.local.get('activeRezerv')));
    // let date = new Date(active.ExpireDate);

    // // console.log(date);

    // await this.local.remove('activeRezerv');
    // await this.local.remove('activeOrder');

    this.platform.ready().then(() => {
      this.OneSignalInit();
    });
    // //check if activeorder have send home page step 5
    // if (localStorage.getItem('activeOrder') != null) {
    //   this.router.navigate(['/home/'+JSON.parse(localStorage.getItem('activeOrder')).step]);
    // }
    //get value selectedapp

    this.service.CheckInternet().then((network) => {
      window.addEventListener('offline', async () => {
        await this.service.Toast('check_network');
        this.navCtrl.navigateRoot(['./no-wifi']);
      });
      if (network == false) {
        //send no-wifi page
        this.navCtrl.navigateRoot(['./no-wifi']);
        return;
      }
    });

    this.service.selectedApp$.subscribe((data) => {
      this.selected = data;
    });

    let loggedin = await this.auth.isloggedIn();
    if (loggedin) {
      this.router.navigate(['/transition']);
      // this.router.navigate(['/no-wifi']);
    }
  }
  myreservation() {
    this.router.navigate(['/myreservation']);
    this.menuCtrl.close();
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
    this.navCtrl.navigateRoot(['/evohome']);
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
    document
      .getElementById('main-content')
      .classList.remove('menu-content-open');
    this.service.setValueSelectedApp('ayig');
    
    this.router.navigate(['/home']);
  }
  changeToEvo() {
    //reload page
    this.menuCtrl.close();
    document
      .getElementById('main-content')
      .classList.remove('menu-content-open');
    this.service.setValueSelectedApp('evo');

    this.navCtrl.navigateRoot(['/evohome']);
  }
  async logout() {
    //send logout request
    await this.apiService.logout();
    this.service.TokenCheck = false;
    OneSignal.setExternalUserId(null);

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
