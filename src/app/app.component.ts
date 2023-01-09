import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { MyService } from './envoriment/my-service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selected;
  public appPages = [];
  @ViewChild('SplitPane') SplitPane;
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    public service: MyService,
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    this.service.selectedApp$.subscribe((data) => {
      this.selected = data;
    });

    
    //get token from local storage
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

            //PROBLEM HERE

            this.menuCtrl.close();
            //PROBLEM HERE

            this.service.setValueSelectedApp('');

            this.navCtrl.navigateRoot(['./login']);
          }
        });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      //PROBLEM HERE
      this.menuCtrl.close();
      //PROBLEM HERE

      this.service.setValueSelectedApp('');

      this.navCtrl.navigateRoot(['./login']);
    }

    this.service.user = JSON.parse(localStorage.getItem('user'));
    
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
