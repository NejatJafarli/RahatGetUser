import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.page.html',
  styleUrls: ['./myreservation.page.scss'],
})
export class MyreservationPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  navBack(){
    this.navCtrl.back();
  }

}
