import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  

  @Input() background: string = '#fff';
  backgroundCss:string  = '--background: #fff';
  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.background);
    let el = document.querySelector('ion-toolbar');
    el.style.setProperty('--background', this.background);
    // this.backgroundCss = '--background: '+this.background;
  }

  goToSetting(){
    this.router.navigate(['/setting']);
  }
}
