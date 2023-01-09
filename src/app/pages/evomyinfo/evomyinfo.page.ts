import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evomyinfo',
  templateUrl: './evomyinfo.page.html',
  styleUrls: ['./evomyinfo.page.scss'],
})
export class EvomyinfoPage implements OnInit {

  step: number = 1;
  passwordType: string = 'password';
  passwordType1: string = 'password';
  passwordType2: string = 'password';
  passwordShow: boolean = false;
  passwordShow1: boolean = false;
  passwordShow2: boolean = false;

  public tooglePassword() {
    if (this.passwordShow) {
      this.passwordType = 'password';
      this.passwordShow = false;
    }else {
      this.passwordType = 'text';
      this.passwordShow = true;
    }
  }
  public tooglePassword1() {
    if (this.passwordShow1) {
      this.passwordType1 = 'password';
      this.passwordShow1 = false;
    }else {
      this.passwordType1 = 'text';
      this.passwordShow1 = true;
    }
  }
  public tooglePassword2() {
    if (this.passwordShow2) {
      this.passwordType2 = 'password';
      this.passwordShow2 = false;
    }else {
      this.passwordType2 = 'text';
      this.passwordShow2 = true;
    }
  }
  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  profile1() {
    this.step = 1;
  }

  profile2() {
    this.step = 2;
  }
  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : this.step = 1;
  }
  backevohome() {
    this.navCtrl.back();
  }

}
