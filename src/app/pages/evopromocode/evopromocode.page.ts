import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evopromocode',
  templateUrl: './evopromocode.page.html',
  styleUrls: ['./evopromocode.page.scss'],
})
export class EvopromocodePage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  backevohome(){
    this.navCtrl.back();
  }

}
