import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.page.html',
  styleUrls: ['./addcar.page.scss'],
})
export class AddcarPage implements OnInit {

  step: number = 1;

  constructor(private router: Router) { }

  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : this.step = 1;
  }

  ngOnInit() {
  }

  addcar1() {
    this.step = 1;
  }
  addcar2() {
    this.step = 2;
  } 

}
