import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chatrg',
  templateUrl: './chatrg.page.html',
  styleUrls: ['./chatrg.page.scss'],
})
export class ChatrgPage implements OnInit {

  constructor(private router:Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  close(){
    this.navCtrl.back();
  }
}
