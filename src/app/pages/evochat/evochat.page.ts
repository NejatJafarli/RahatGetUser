import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evochat',
  templateUrl: './evochat.page.html',
  styleUrls: ['./evochat.page.scss'],
})
export class EvochatPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backevohome(){
    //send evohome stepid 5
    this.router.navigate([`/evohome/5`]);
  }
}
