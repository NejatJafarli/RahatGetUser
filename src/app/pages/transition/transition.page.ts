import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MyService } from 'src/app/services/my-service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.page.html',
  styleUrls: ['./transition.page.scss'],
})
export class TransitionPage implements OnInit {
  temp;
  constructor(private router: Router, private service: MyService,private navCtrl:NavController) {}

  ngOnInit() {}

  evo() {
    this.service.setValueSelectedApp('evo');
    this.navCtrl.navigateRoot(['/evohome']);
  }
  ayig() {
    this.service.setValueSelectedApp('ayig');
    //call app.component.ts  updateSelected() function
    // this.router.navigate(['/home'],{state:{reload:true}});
    this.router.navigate(['/home']);
  }
}
