import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evohelp',
  templateUrl: './evohelp.page.html',
  styleUrls: ['./evohelp.page.scss'],
})
export class EvohelpPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backevohome(){
    this.router.navigateByUrl('/evohome');
  }

}
