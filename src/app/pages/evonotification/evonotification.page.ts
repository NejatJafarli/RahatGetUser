import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evonotification',
  templateUrl: './evonotification.page.html',
  styleUrls: ['./evonotification.page.scss'],
})
export class EvonotificationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backevohome(){
    this.router.navigate(['/evohome']);
  }

}
