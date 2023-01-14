import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MyService } from 'src/app/envoriment/my-service';

@Component({
  selector: 'app-chatrg',
  templateUrl: './chatrg.page.html',
  styleUrls: ['./chatrg.page.scss'],
})
export class ChatrgPage implements OnInit {

  constructor(private router:Router,private navCtrl:NavController,private myService:MyService) { }
  ChatId;
  messages = [];
  msg;
  ngOnInit() {

  }
  activeOrder=JSON.parse(localStorage.getItem('activeOrder'));
  ionViewDidEnter() {
    console.log(this.activeOrder);
    this.myService.mySocket.emit('getMessages', this.activeOrder.OrderId);
    this.myService.mySocket.once('getMessages', (data) => {
      this.messages = data;
    });
    this.myService.mySocket.on('NewMessage', (data) => {
      this.messages.push(data);
    });
  }
  sendMsg(){
    this.myService.mySocket.emit('SendMessage', {
      OrderId: this.activeOrder.OrderId,
      message: this.msg,
      writer: 'user',
    });
    this.msg = '';
  }
  close(){
    // this.navCtrl.back();
    //send home step 6
    this.router.navigate(['/home/6']);

     
  }
}
