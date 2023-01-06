import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { MyService } from 'src/app/envoriment/my-service';
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
    private service: MyService
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
            Authorization: 'Bearer ' + localStorage.getItem('token'),
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

    let token = localStorage.getItem('token');
    //check if user is logged in
    if (token) {
      let mes = await this.http
        .get(this.service.ApiLink + '/user/checktoken', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .toPromise();
      if (mes['message'] == 'success') {
        this.router.navigate(['transition']);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
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
      localStorage.setItem('token', res['token']);
      localStorage.setItem('user', JSON.stringify(res['user']));
      this.action = 'login';
      localStorage.removeItem('sendNewRequestEndDate');
      this.loginPhone='';
      this.loginPassword='';
      this.service.Toast('Login Success');
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
  async loginstep3() {
    if (this.registerPhone[0] == '+') {
      this.registerPhone = this.registerPhone.substring(4);
    }
    if (localStorage.getItem('sendNewRequestEndDate')) {
      // Y-m-d H:i:s
      let endDate = localStorage.getItem('sendNewRequestEndDate');
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
      localStorage.setItem('sendNewRequestEndDate', res['end_date']);
      this.step = 3;
    } else {
      this.registerPassword = '';
      this.service.Toast(res['error']);
    }
  }
}
