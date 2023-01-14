import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { MyService } from './envoriment/my-service';
import OneSignal from 'onesignal-cordova-plugin';

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
    OneSignal.setAppId("2ea6c1f9-4174-4ee3-b8d6-b2f397629dc4");
    OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
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
    private navCtrl: NavController
    ,private platform:Platform
  ) {
    // platform.ready().then(() => {
    //   this.OneSignalInit();
    // });
    
    this.service.selectedApp$.subscribe((data) => {
      this.selected = data;
    });

    // // // //get token from local storage
    // console.log(localStorage.removeItem('activeOrder'));
    
    let token = localStorage.getItem('token');
    //check if user is logged in

    //if token is not null
    if (token != null) {
      this.http
        .get(this.service.ApiLink + '/user/checktoken', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .toPromise()
        .then((res) => {

          if (res['message'] != 'success') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            this.menuCtrl.close();

            this.service.setValueSelectedApp('');

            this.navCtrl.navigateRoot(['./login']);
          } else if (res['message'] == 'success') {
            this.service.mySocket.connect();
            this.service.mySocket.emit('UserConnect', {
              UserId: 'user' + JSON.parse(localStorage.getItem('user')).id,
            });
          }
        })
        .catch((err) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.menuCtrl.close();

          this.service.setValueSelectedApp('');


          this.navCtrl.navigateRoot(['./login']);
        });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.menuCtrl.close();
      this.service.setValueSelectedApp('');
      this.navCtrl.navigateRoot(['./login']);
      return
    }
    this.service.user = JSON.parse(localStorage.getItem('user'));

    // //check if activeorder have send home page step 5
    // if (localStorage.getItem('activeOrder') != null) {
    //   this.router.navigate(['/home/'+JSON.parse(localStorage.getItem('activeOrder')).step]);
    // }
    


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
    localStorage.setItem('selectedApp', 'ayig');
    this.router.navigate(['/home'], { state: { reload: true } });
  }
  changeToEvo() {
    //reload page

    this.menuCtrl.close();
    localStorage.setItem('selectedApp', 'evo');
    this.router.navigate(['/evohome'], { state: { reload: true } });
  }
  async logout() {
    //send logout request
    this.http
      .get(this.service.ApiLink + '/user/logout', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .toPromise();

    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
