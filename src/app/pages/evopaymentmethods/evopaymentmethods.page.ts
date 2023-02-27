import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-evopaymentmethods',
  templateUrl: './evopaymentmethods.page.html',
  styleUrls: ['./evopaymentmethods.page.scss'],
})
export class EvopaymentmethodsPage implements OnInit {

  step: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private navCtrl:NavController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['stepid']) {
        this.step = parseInt(params['stepid']);
      } else {
        this.step = 1;
      }
    });
  }

  addcart1() {
    this.step = 1;
  }
  addcart2() {
    this.step = 2;
  }

  backbtn() {
    this.step == 1 ? this.navCtrl.navigateRoot(['/evohome']) : this.step = 1;
  }
  backevohome() {
    this.navCtrl.back();
  }

}
