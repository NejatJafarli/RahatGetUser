import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MyService } from 'src/app/services/my-service';

@Component({
  selector: 'app-no-wifi',
  templateUrl: './no-wifi.page.html',
  styleUrls: ['./no-wifi.page.scss'],
})
export class NoWifiPage implements OnInit {
  constructor(
    private myService: MyService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {}

  async TryConnect() {
    let wifi = await this.myService.CheckInternet();
    if (wifi) {
      //nav back
      this.navCtrl.back();
      // this.router.navigate(['/home']);
    } else {
      await this.myService.Toast('check_network_try_again');
    }
  }
}
