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
  ionViewDidEnter() {
    this.ChatId = localStorage.getItem('chatId');
    this.myService.mySocket.emit('getMessages', this.ChatId);
    this.myService.mySocket.on('getMessages', (data) => {
      this.messages = data;
    });
    this.myService.mySocket.on('Messages', (data) => {
      this.messages.push(data);
    });
  }
  sendMsg(){
    this.myService.mySocket.emit('Message', {
      chatId: this.ChatId,
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
