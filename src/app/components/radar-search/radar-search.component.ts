import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { IonAvatar } from '@ionic/angular';
@Component({
  selector: 'app-radar-search',
  templateUrl: './radar-search.component.html',
  styleUrls: ['./radar-search.component.scss'],
})
export class RadarSearchComponent implements OnInit {
  @Input() personName:string;
  @Input() personPhoto:string;
  @Input() isSearching:boolean = true;
  @ViewChild('pPhoto1') personP1:any;
  @ViewChild('pPhoto2') personP2:any;
  @ViewChild('pPhoto3') personP3:any;
  @ViewChild('pPhoto4') personP4:any;
  @ViewChild('pPhoto5') personP5:any;

  @Input() personPhoto1:string = "/assets/img/p1.jpg";
  @Input() personPhoto2:string = "/assets/img/p2.jpg";
  @Input() personPhoto3:string = "/assets/img/p3.jpg";
  @Input() personPhoto4:string = "/assets/img/p4.jpg";
  @Input() personPhoto5:string = "/assets/img/p5.jpg";
  correctPerson:number;

  constructor() {
  }

  ngOnInit() {  
   this.correctPerson = Math.floor(Math.random() * 5) + 1;
    switch(this.correctPerson){
      case 1:
        this.personPhoto1 = this.personPhoto;
        break;
      case 2:
        this.personPhoto2 = this.personPhoto;
        break;
      case 3:
        this.personPhoto3 = this.personPhoto;
        break;
      case 4:
        this.personPhoto4 = this.personPhoto;
        break;
      case 5:
        this.personPhoto5 = this.personPhoto;
        break;
    }
  }
  changeState(){
    this.isSearching = !this.isSearching;
  }
}
