import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { identity } from 'rxjs/internal/util/identity';
import { MyService } from 'src/app/envoriment/my-service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.page.html',
  styleUrls: ['./myinfo.page.scss'],
})
export class MyinfoPage implements OnInit {
  step: number = 1;
  passwordType: string = 'password';
  passwordType1: string = 'password';
  passwordType2: string = 'password';
  passwordShow: boolean = false;
  passwordShow1: boolean = false;
  passwordShow2: boolean = false;

  User;

  public tooglePassword() {
    if (this.passwordShow) {
      this.passwordType = 'password';
      this.passwordShow = false;
    } else {
      this.passwordType = 'text';
      this.passwordShow = true;
    }
  }
  public tooglePassword1() {
    if (this.passwordShow1) {
      this.passwordType1 = 'password';
      this.passwordShow1 = false;
    } else {
      this.passwordType1 = 'text';
      this.passwordShow1 = true;
    }
  }
  public tooglePassword2() {
    if (this.passwordShow2) {
      this.passwordType2 = 'password';
      this.passwordShow2 = false;
    } else {
      this.passwordType2 = 'text';
      this.passwordShow2 = true;
    }
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private myService: MyService,
    private navCtrl: NavController
  ) {}
  navBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('user'));
  }
  async Save() {
    let res = await this.http
      .post(
        this.myService.ApiLink + '/user/updateAccount',
        {
          fullname: this.User.fullname,
          phone: this.User.phone,
          age: this.User.age,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .toPromise();
    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }
    this.User = res['data'];
    this.myService.Toast(res['message']);
    localStorage.setItem('user', JSON.stringify(this.User));
    this.router.navigate(['/home']);
  }
  OldPass;
  NewPass;
  ConfirmPass;
  profile1() {
    this.step = 1;
  }
  async SavePass() {
    if (this.OldPass == null) {
      this.myService.Toast('Please enter old password');
      return;
    }
    if (this.NewPass != this.ConfirmPass) {
      this.myService.Toast('Password not match');
      return;
    }
    let res = await this.http
      .post(
        this.myService.ApiLink + '/user/updatePassword',
        {
          old_password: this.OldPass,
          new_password: this.NewPass,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .toPromise();
    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }

    this.myService.Toast(res['message']);

    this.step = 1;
    this.OldPass = null;
    this.NewPass = null;
    this.ConfirmPass = null;
  }
  profile2() {
    this.step = 2;
  }
  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : (this.step = 1);
  }
}
