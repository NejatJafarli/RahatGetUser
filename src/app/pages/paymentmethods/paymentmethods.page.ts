import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.page.html',
  styleUrls: ['./paymentmethods.page.scss'],
})
export class PaymentmethodsPage implements OnInit {
  
  step: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.step == 1 ? this.router.navigate(['/home']) : this.step = 1;
  }
}
