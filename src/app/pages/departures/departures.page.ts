import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.page.html',
  styleUrls: ['./departures.page.scss'],
})
export class DeparturesPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  navBack()
{
  this.navCtrl.back();
}
}

