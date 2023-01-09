import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.page.html',
  styleUrls: ['./promocode.page.scss'],
})
export class PromocodePage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  navBack(){
    this.navCtrl.back();
  }

}
