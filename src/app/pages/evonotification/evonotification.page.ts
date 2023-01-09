import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evonotification',
  templateUrl: './evonotification.page.html',
  styleUrls: ['./evonotification.page.scss'],
})
export class EvonotificationPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  backevohome(){
    this.navCtrl.back();
  }

}
