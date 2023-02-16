import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonInput } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { MyService } from 'src/app/services/my-service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
// import { LoginPageForm } from './login.page.form';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordShow: boolean = false;
  step: number = 1;

  public tooglePassword() {
    if (this.passwordShow) {
      this.passwordType = 'password';
      this.passwordShow = false;
    } else {
      this.passwordType = 'text';
      this.passwordShow = true;
    }
  }

  // form: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: MyService,
    private apiService: ApiService,
    private local: StorageService,
    private auth: AuthService,
    private imageService: ImageService
  ) {}
  codePhone;
  action;

  async getCode(code) {
    let url;
    if (this.action == 'register') {
      url = '/user/register/otpcode';
      this.codePhone = this.registerPhone;
    } else if (this.action == 'login') {
      url = '/user/login/otpcode';
      this.codePhone = this.loginPhone;
    }
    if (this.codePhone[0] == '+') this.codePhone = this.codePhone.substring(4);
    let res = await this.http
      .post(
        this.service.ApiLink + url,
        {
          requestId: this.reqId,
          code: code,
        },
        {
          headers: {
            Authorization: 'Bearer ' + (await this.local.getToken()),
          },
        }
      )
      .toPromise();

    if (res['status']) {
      this.service.Toast(res['success']);
      this.step = 1;
    } else {
      this.service.Toast(res['error']);
    }
  }
  async ngOnInit() {
    // this.form = new LoginPageForm(this.formBuilder).createForm();
    // console.log(this.form);
  }
  loginPhone;
  loginPassword;
  registerPassword;
  registerFullname;
  registerPhone;
  async login() {
    //send post request to server with phone and password
    //if this.loginPhone start with +

    if (this.loginPhone[0] == '+') {
      this.loginPhone = this.loginPhone.substring(4);
    }

    let res = await this.http
      .post(this.service.ApiLink + '/user/login', {
        phone: '+994' + this.loginPhone,
        password: this.loginPassword,
      })
      .toPromise();

    console.log(res);

    if (res['status']) {
      await this.local.setToken(res['token']);
      let user = res['user'];
      // http://user.rahatget.az/uploads/users/
      user.photo = `data:image/jpeg;base64,${res['user']['photo']}`;
      await this.local.set('user', JSON.stringify(user));
      this.service.user = user;
      this.action = 'login';
      this.local.remove('sendNewRequestEndDate');
      this.loginPhone = '';
      this.loginPassword = '';
      this.service.Toast('Login Success');
      this.service.mySocket.connect();
      let userid = 'user' + res['user']['id'];
      this.service.mySocket.emit('UserConnect', {
        UserId: userid,
      });

      // OneSignal.setExternalUserId(userid);
      this.router.navigate(['transition']);
    } else {
      this.loginPassword = '';
      this.service.Toast(res['error']);
    }
  }
  loginstep1() {
    this.step = 1;
  }
  loginstep2() {
    this.step = 2;
  }
  reqId;
  async SendAgainOtp() {
    if (await this.local.get('sendNewRequestEndDate')) {
      // Y-m-d H:i:s
      let endDate = await this.local.get('sendNewRequestEndDate');
      let now: number = Date.now();
      let end = new Date(endDate).getTime();
      if (now < end) {
        let second = Math.floor((end - now) / 1000);
        this.service.Toast(
          'Please wait ' + second + ' second to send new request'
        );
        return;
      }
    }

    let res = await this.http
      .post(this.service.ApiLink + '/user/register/sendAgainOtpCode', {
        requestId: this.reqId,
      })
      .toPromise();

    if (res['status']) {
      this.service.Toast(res['success']);
      this.local.set('sendNewRequestEndDate', res['end_date']);
    } else {
      this.registerPassword = '';
      this.service.Toast(res['error']);
    }
  }
  async loginstep3() {
    if (this.registerPhone[0] == '+') {
      this.registerPhone = this.registerPhone.substring(4);
    }
    let endDate = await this.local.get('sendNewRequestEndDate');
    if (endDate) {
      // Y-m-d H:i:s
      let now: number = Date.now();
      let end = new Date(endDate).getTime();
      if (now < end) {
        let second = Math.floor((end - now) / 1000);
        this.service.Toast(
          'Please wait ' + second + ' second to send new request'
        );
        return;
      }
    }
    // registerPassword must be 6 character
    if (this.registerPassword.length < 6) {
      this.service.Toast('Password must be 6 character');
      return;
    }

    let res = await this.http
      .post(this.service.ApiLink + '/user/register', {
        phone: '+994' + this.registerPhone,
        password: this.registerPassword,
        fullname: this.registerFullname,
      })
      .toPromise();
    console.log(res);

    if (res['status']) {
      this.registerFullname = '';
      this.registerPassword = '';
      this.registerPhone = '';
      this.action = 'register';
      this.service.Toast(res['success']);
      this.reqId = res['requestId'];
      this.local.set('sendNewRequestEndDate', res['end_date']);
      this.step = 3;
    } else {
      this.registerPassword = '';
      this.service.Toast(res['error']);
    }
  }
}
