import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Geolocation as MyGeo, PermissionStatus } from '@capacitor/geolocation';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HttpClient } from '@angular/common/http';
import { MyService } from 'src/app/envoriment/my-service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @Input() modalinitialbreakpoint = 0.55;
  @ViewChild('modal') modal: IonModal;


  modalOpen: boolean = true;
  breakpoint: number = 1;
  step: number = 1;
  globalContext: any = this;
  toggleDisplayForRezerv=false;

  rezervChange(){
    this.toggleDisplayForRezerv=!this.toggleDisplayForRezerv;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  rating;
  starClick(value) {
    this.rating = value;
  }
  temp;
  constructor(
    private roter: Router,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private service: MyService
  ) {
    let temp = this.roter.getCurrentNavigation()?.extras.state;

    if (temp) {
      setTimeout(() => {
        if (temp.reload) {
          window.location.reload();
        }
      }, 100);
    }
  }
  MyCards;
  selectedRadio;

  RadioClick(value) {
    let json = {
      value: this.MyCards[value].Cardvalue,
      iconName: this.MyCards[value].iconName,
    };
    this.modalCtrl.dismiss(json);
  }
  position: any;
  WherePositions: any = [];
  WherePosition: any;

  WhereTextResults: any = [];
  WhereText: string = '';
  positionGeocod: string;
  resultClick(value) {
    this.WhereText = value;
    this.WherePosition =
      this.WherePositions[this.WhereTextResults.indexOf(value)];
    this.WhereTextResults = [];
    this.WherePositions = [];

    this.modalCtrl.dismiss();
    this.step = 2;
  }
  whereChange(value) {
    this.WhereTextResults = [];
    this.WherePositions = [];

    let url =
      '/places?query=' + encodeURI(value) + `&key=${this.service.apiKey}`;
      

    this.http.get(url).subscribe((data) => {
      // console.log(data);
      data['results'].forEach((element) => {
        this.WhereTextResults.push(element['name']);
        this.WherePositions.push(element['geometry']['location']);
      });
    });
  }

  geoCodePosition(position) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    let request = {
      latLng: latlng,
    };
    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          this.positionGeocod = results[0].formatted_address;
        } else {
          this.positionGeocod = '';
        }
      }
    });
  }
  SelectedPayment=1;
  
  CardValue;
  ngOnInit() {
    this.CardValue="Kartla ödəniş"

    this.MyCards = [];


    let json = {
      Cardvalue: '**** **** **** 5755',
    };
    this.MyCards.push(json);

    json = {
      Cardvalue: '**** **** **** 5756',
    };
    this.MyCards.push(json);
    json = {
      Cardvalue: '**** **** **** 1111',
    };
    this.MyCards.push(json);
    // this.CardValue="Kartla ödəniş"
    //check permission
    MyGeo.checkPermissions().then((res) => {
      if (res.location === 'granted') {
        //get current location
        MyGeo.getCurrentPosition({ enableHighAccuracy: true }).then(
          (position) => {
            this.position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.geoCodePosition(position);
          }
        );
      } else {
        //request permission
        MyGeo.requestPermissions().then((res) => {
          if (res.location === 'granted') {
            //get current location
            MyGeo.getCurrentPosition({ enableHighAccuracy: true }).then(
              (position) => {
                this.position = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                this.geoCodePosition(position);
              }
            );
          }
        });
      }
    });

    // this.MyCards = [];


    // let json = {
    //   Cardvalue: '**** **** **** 5755',
    // };
    // this.MyCards.push(json);

    // json = {
    //   Cardvalue: '**** **** **** 5756',
    // };
    // this.MyCards.push(json);
    // json = {
    //   Cardvalue: '**** **** **** 1111',
    // };
    // this.MyCards.push(json);

  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // console.log(ev.detail.data);
    let json = ev.detail.data;
    if (json == undefined) {
      return;
    }
    this.CardValue = json['value'];
    this.SelectedPayment=2;
  }

  ionViewDidEnter() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['stepid']) {
        this.step = parseInt(params['stepid']);
      } else {
        this.step = 1;
      }
    });
    // let step_id = this.activatedRoute.paramMap.get('stepid');
    // if(step_id){
    //   this.step = parseInt(step_id);
    // }
    // console.log("step_id", step_id);
  }
  // ionViewDidEnter() {
  //   this.step=1;
  //   this.breakpoint = 1;
  //   this.modalOpen= true;
  //   this.modal.setCurrentBreakpoint(this.modalinitialbreakpoint);
  //   console.log('ionViewDidEnter',this);
  // }
  // ionViewDidLeave(){
  //   this.modalOpen = false;
  //   // this.modalCtrl.dismiss();

  // }
  imtina() {
    this.modalOpen = false;
    this.modalCtrl.dismiss();
    this.roter.navigate(['/transition']);
  }

  // onBreakpointChange($event) {
  //  if(this.breakpoint==2){
  //     this.breakpoint=1;
  //   }else if (this.breakpoint==1){
  //     this.breakpoint=2;
  //     this.modal.setCurrentBreakpoint(1);
  //   }else {
  //     return;
  //   }

  // }

  home1() {
    this.step = 1;
  }
  home2() {
    this.step = 2;
    // this.modalCtrl.dismiss();
  }
  home3() {
    this.step = 3;
  }
  home4() {
    this.step = 4;
  }
  home5() {
    this.step = 5;
  }
  home6() {
    this.step = 6;
  }
  home7() {
    this.step = 7;
  }
  home8() {
    this.step = 8;
  }
  chatclick() {
    this.roter.navigate(['/chat']);
  }
  ngAfterViewInit(): void {}

  modalclose() {
    this.modalOpen = false;
    this.modalCtrl.dismiss();
  }
  sendProfile() {
    this.modalclose();
    this.roter.navigate([`/paymentmethods/2`]);
  }
  // fromFocus() {
  //   // const {nativeElement} = this.modal;
  //   // if(!nativeElement) return;
  //   // nativeElement.setCurrentBreakpoint(1);
  //   this.modal.setCurrentBreakpoint(1);
  // }
  // whereFocus(){
  //   // console.log('whereFocus');
  //   this.modal.setCurrentBreakpoint(1);
  // }
}
