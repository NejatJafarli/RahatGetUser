import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(private router:Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  close(){
    this.navCtrl.back();
  }

}
