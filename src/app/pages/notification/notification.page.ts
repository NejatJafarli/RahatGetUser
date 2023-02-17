import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/my-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  constructor(private navCtrl: NavController, private apiService: ApiService,private myService:MyService) {}

  notifications;
  ngOnInit() {}
  async ionViewDidEnter() {
    let res = await this.apiService.getNotifications();
    if(this.myService.handleErrors(res)) return;
    this.notifications=res['data'];
    console.log(this.notifications);
    
  }

  navBack() {
    this.navCtrl.back();
  }
}
