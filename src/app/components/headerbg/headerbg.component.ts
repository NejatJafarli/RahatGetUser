import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-headerbg',
  templateUrl: './headerbg.component.html',
  styleUrls: ['./headerbg.component.scss'],
  standalone: true,
  imports:[
    IonicModule,
    CommonModule
  ]
})
export class HeaderbgComponent implements OnInit {
  
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: string;
  @Input() paddingTop: number = 40;
  paddingTopStyle: string;
  @Input() heigth1: number = 235;
  height1Css : string;
  constructor() { }

  ngOnInit() {    
  this.paddingTopStyle = this.paddingTop + 'px';
  this.height1Css = this.heigth1 + 'px';
  }

}
