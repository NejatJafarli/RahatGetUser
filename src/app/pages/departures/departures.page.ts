import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/my-service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.page.html',
  styleUrls: ['./departures.page.scss'],
})
export class DeparturesPage implements OnInit {
  constructor(private navCtrl: NavController, private apiService: ApiService,private myService:MyService) {}
  async ngOnInit() {
    let res = await this.apiService.getRides();

    console.log(res);
    if(!res['status']) this.myService.Toast(res['message']);
    
    this.rides = res['data'];
  }
  rides;
  async IonViewDidEnter() {
 
  }
  navBack() {
    this.navCtrl.back();
  }
}
