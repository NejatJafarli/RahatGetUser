import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evodepartures',
  templateUrl: './evodepartures.page.html',
  styleUrls: ['./evodepartures.page.scss'],
})
export class EvodeparturesPage implements OnInit {

  constructor(private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }
  backevohome() {
    this.navCtrl.back();
  }

}
