import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evohelp',
  templateUrl: './evohelp.page.html',
  styleUrls: ['./evohelp.page.scss'],
})
export class EvohelpPage implements OnInit {

  constructor(private router:Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  backevohome(){
    this.navCtrl.back();
  }

}
