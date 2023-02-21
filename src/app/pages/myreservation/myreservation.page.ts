import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/my-service';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.page.html',
  styleUrls: ['./myreservation.page.scss'],
})
export class MyreservationPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private myService: MyService
  ) {}

  rezervs = [];
  async ngOnInit() {}
  async ionViewDidEnter() {
    let res = await this.apiService.getRezervs();
    if (!res['status']) this.myService.Toast(res['message']);
    console.log(res);

    this.rezervs = res['data'];
  }
  navBack() {
    this.navCtrl.back();
  }
}
