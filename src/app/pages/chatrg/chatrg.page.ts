import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MyService } from 'src/app/services/my-service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chatrg',
  templateUrl: './chatrg.page.html',
  styleUrls: ['./chatrg.page.scss'],
})
export class ChatrgPage implements OnInit {
  constructor(
    private router: Router,
    private local: StorageService,
    private navCtrl: NavController,
    private myService: MyService
  ) {
    this.activeOrder = {
      Driver: {},
    };
    this.local.get('activeOrder').then((data) => {
      this.activeOrder = JSON.parse(data);
      console.log(this.activeOrder);
    });
  }
  ChatId;
  messages = [];
  msg;
  async ngOnInit() {
    this.activeOrder = JSON.parse(await this.local.get('activeOrder'));
    console.log(this.activeOrder);
    if (!this.myService.hasListeners('getMessages')) {
      this.myService.mySocket.once('getMessages', (data) => {
        this.messages = data;
      });
    }
    this.myService.mySocket.emit('GetMessages', this.activeOrder.OrderId);
    //show this.myService.mysokcet listeners
    let socket = this.myService.mySocket;
    console.log(socket);
    if (!this.myService.hasListeners('NewMessage')) {
      this.myService.mySocket.on('NewMessage', (data) => {
        console.log(data);

        this.messages.push(data);
      });
    }
  }

  ionViewWillEnter() {
    if (!this.myService.hasListeners('getMessages')) {
      this.myService.mySocket.once('getMessages', (data) => {
        this.messages = data;
      });
    }
    if (!this.myService.hasListeners('NewMessage')) {
      this.myService.mySocket.on('NewMessage', (data) => {
        console.log(data);

        this.messages.push(data);
      });
    }
  }
  activeOrder;
  sendMsg() {
    this.myService.mySocket.emit('SendMessage', {
      OrderId: this.activeOrder.OrderId,
      message: this.msg,
      writer: 'user',
    });
    this.msg = '';
  }
  close() {
    // this.navCtrl.back();
    //send home step 6
    // this.router.navigate(['/home/' + this.activeOrder.step]);
    this.navCtrl.back();
  }
}
