import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evochat',
  templateUrl: './evochat.page.html',
  styleUrls: ['./evochat.page.scss'],
})
export class EvochatPage implements OnInit {

  constructor(private router:Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  backevohome(){
    this.navCtrl.back();
  }
}
