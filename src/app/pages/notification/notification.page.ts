import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  constructor(private navCtrl: NavController, private apiService: ApiService) {}

  notifications;
  ngOnInit() {}
  async ionViewDidEnter() {
    let res = await this.apiService.getNotifications();
    this.notifications=res['data'];
    console.log(this.notifications);
    
  }

  navBack() {
    this.navCtrl.back();
  }
}
