import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evopromocode',
  templateUrl: './evopromocode.page.html',
  styleUrls: ['./evopromocode.page.scss'],
})
export class EvopromocodePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backevohome(){
    this.router.navigate(['/evohome']);
  }

}
