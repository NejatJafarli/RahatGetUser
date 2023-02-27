import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation as MyGeo, PermissionStatus } from '@capacitor/geolocation';
import { ActivatedRoute, Router } from '@angular/router';
import { MyService } from 'src/app/services/my-service';
import { HttpClient } from '@angular/common/http';
import { OverlayEventDetail } from '@ionic/core';
import { IonModal, MenuController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
declare var google;
@Component({
  selector: 'app-evohome',
  templateUrl: './evohome.page.html',
  styleUrls: ['./evohome.page.scss'],
})
export class EvohomePage implements OnInit {
  presentingElement = null;
  //view child map
  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('modal') modal: IonModal;
  @ViewChild('modal2') modal2: IonModal;
  @ViewChild('modal3') modal3: IonModal;
  modalOpen: boolean = true;
  selectedIcon: string;
  CardValue: string;
  selectedRadio;
  SelectedPayment = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menuCtrl: MenuController,
    private service: MyService,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private apiService: ApiService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['stepid']) {
        this.step = parseInt(params['stepid']);
      } else {
        this.step = 1;
      }
    });
    // let temp = this.router.getCurrentNavigation()?.extras.state;
    // if (temp) {
    //   setTimeout(() => {
    //     if (temp.reload) {
    //       window.location.reload();
    //     }
    //   }, 100);
    // }
    this.SelectedAccidents = 'accident';
    this.CardValue = 'Kartla ödəniş';

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
  }
  sendProfile() {
    this.modalOpen = false;
    this.modalCtrl.dismiss();
    this.router.navigate([`/paymentmethods/2`]);
  }
  MyCards;

  RadioClick(value) {
    let json = {
      value: this.MyCards[value].Cardvalue,
      iconName: this.MyCards[value].iconName,
    };
    this.modalCtrl.dismiss(json);
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // console.log(ev.detail.data);
    let json = ev.detail.data;
    if (json == undefined) {
      return;
    }
    this.CardValue = json['value'];
    this.SelectedPayment = 2;
  }
  position;
  positionGeocod;
  temp = true;
  loadmap = true;
  step: number = 1;
  toggleDisplay = true;
  toggleDisplayForAccidents = false;

  SelectedAccidents;
  SelectAccidents = ['accident', 'unhealthy', 'more'];

  map;
  accidentsChange() {
    if (this.SelectedAccidents == 'more') this.toggleDisplayForAccidents = true;
    else this.toggleDisplayForAccidents = false;
  }
  async ionViewDidEnter() {
    // if (this.loadmap) {
    // setTimeout(() => {
    // });
    // this.loadmap = false;
    // }
    // setTimeout(()=>{
    //   this.showMap();
    // },1000);
    // //check permission
    // MyGeo.checkPermissions().then((res) => {
    //   if (res.location === 'granted') {
    //     //get current location
    //     MyGeo.watchPosition({ enableHighAccuracy: true }, (position) => {
    //       console.log("hello");
    //       if (position.coords) {
    //         this.position = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         };
    //         this.geoCodePosition(position);
    //         if (this.temp) {
    //           this.step = 2;
    //           this.temp = false;
    //         }
    //       }
    //       console.log(this.loadmap);
    //       if (this.loadmap) {
    //         setTimeout(() => {
    //           this.showMap();
    //         });
    //         this.loadmap = false;
    //       }
    //     });
    //   } else {
    //     //request permission
    //     MyGeo.requestPermissions().then((res) => {
    //       if (res.location === 'granted') {
    //         //get current location
    //         MyGeo.watchPosition({ enableHighAccuracy: true }, (position) => {
    //           if (position.coords) {
    //             this.position = {
    //               lat: position.coords.latitude,
    //               lng: position.coords.longitude,
    //             };
    //             this.geoCodePosition(position);
    //             if (this.temp) {
    //               this.step = 2;
    //               this.temp = false;
    //             }
    //           }
    //           console.log(this.loadmap);
    //             if (this.loadmap) {
    //               setTimeout(() => {
    //                 this.showMap();
    //               });
    //               this.loadmap = false;
    //             }
    //         });
    //       } else {
    //         this.router.navigate(['/transition']);
    //       }
    //     });
    //   }
    // });
  }

  showMap() {
    const location = new google.maps.LatLng(
      this.position.lat,
      this.position.lng
    );
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      draggable: true,
    };
    this.map = new google.maps.Map(document.getElementById('map'), options);

    this.addMarker(location, this.map);
  }
  selectedPosition;
  selectedPositionGeoCode: string;
  selectedPositionGeoCodeTwo: string;
  selectedSearch;

  selectedData = null;
  selectedDataTwo = null;

  WhereTextResults;
  WherePositions;
  WherePosition;
  WherePositionTwo;
  whereText;
  whereTextTwo;
  openModal() {
    //this.modal2
    this.modal2.present();
  }
  closeModal(event) {
    if (this.selectedData == null || this.selectedDataTwo == null) {
      this.service.Toast('toast_location_dont_setted');
    } else {
      if (this.selectedSearchOne == '') {
        this.selectedSearchOne = this.selectedData.name;
        this.service.Toast('toast_choose_location');
      } else if (this.selectedSearchTwo == '') {
        this.selectedSearchTwo = this.selectedDataTwo.name;
        this.service.Toast('toast_choose_location');
      } else {
        this.modal2.dismiss();
        this.WherePosition = this.selectedData.position;
        this.whereText = this.selectedData.name;
        this.selectedPositionGeoCode = this.selectedData.name;

        this.WherePositionTwo = this.selectedDataTwo.position;
        this.whereTextTwo = this.selectedDataTwo.name;
        this.selectedPositionGeoCodeTwo = this.selectedDataTwo.name;
      }
    }
  }
  async changeText(value) {
    this.WhereTextResults = [];
    this.WherePositions = [];
    let res = await this.apiService.getTextSearch(value);
    // let url =
    //   'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
    //   encodeURI(value) +
    //   `&key=${this.service.apiKey}`;
    // console.log(data);
    res['results'].forEach((element) => {
      this.WhereTextResults.push(element['name']);
      this.WherePositions.push(element['geometry']['location']);
    });
  }
  textOne = false;
  textTwo = false;
  selectedSearchOne;
  selectedSearchTwo;

  resultClick(value) {
    if (this.textOne) {
      this.selectedSearchOne = value;
    } else if (this.textTwo) {
      this.selectedSearchTwo = value;
    }

    this.selectedSearch = value;
    this.WherePosition =
      this.WherePositions[this.WhereTextResults.indexOf(value)];

    if (this.textOne) {
      this.selectedData = {
        position: this.WherePosition,
        name: value,
      };
    } else if (this.textTwo) {
      this.selectedDataTwo = {
        position: this.WherePosition,
        name: value,
      };
    }
    this.WhereTextResults = [];
    this.WherePositions = [];
  }
  mark;
  SetWhereIAmTwo() {
    this.toggleDisplay = !this.toggleDisplay;
    //clear car markers from map Future

    //add marker to map
    if (!this.toggleDisplay) {
      this.mark = new google.maps.Marker({
        position: this.position,
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
      });

      this.map.setCenter(this.position);
      this.mark.setPosition(this.map.getCenter());
      this.selectedPosition = this.map.getCenter();

      let geocoder = new google.maps.Geocoder();
      let request = {
        latLng: this.selectedPosition,
      };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0] != null) {
            this.selectedPositionGeoCode = results[0].formatted_address;
            this.selectedDataTwo = {
              position: this.selectedPosition,
              name: this.selectedPositionGeoCode,
            };
            this.selectedSearchOne = this.selectedPositionGeoCode;
          } else {
            this.selectedPositionGeoCode = '';
          }
        }
      });

      google.maps.event.addListener(this.map, 'drag', (event) => {
        this.mark.setPosition(this.map.getCenter());
        this.selectedPosition = this.map.getCenter();

        let geocoder = new google.maps.Geocoder();
        let request = {
          latLng: this.selectedPosition,
        };
        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              this.selectedPositionGeoCodeTwo = results[0].formatted_address;
              this.selectedData = {
                position: this.selectedPosition,
                name: this.selectedPositionGeoCodeTwo,
              };
              this.selectedSearchOne = this.selectedPositionGeoCodeTwo;
            } else {
              this.selectedPositionGeoCodeTwo = '';
            }
          }
        });
      });
    } else {
      this.selectedPosition = null;
      this.selectedPositionGeoCode = '';
      this.mark.setMap(null);
    }
  }
  SetWhereIAm() {
    this.toggleDisplay = !this.toggleDisplay;
    //clear car markers from map Future

    //add marker to map
    if (!this.toggleDisplay) {
      this.mark = new google.maps.Marker({
        position: this.position,
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
      });

      this.map.setCenter(this.position);
      this.mark.setPosition(this.map.getCenter());
      this.selectedPosition = this.map.getCenter();

      let geocoder = new google.maps.Geocoder();
      let request = {
        latLng: this.selectedPosition,
      };
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0] != null) {
            this.selectedPositionGeoCode = results[0].formatted_address;
            this.selectedData = {
              position: this.selectedPosition,
              name: this.selectedPositionGeoCode,
            };
            this.selectedSearchOne = this.selectedPositionGeoCode;
          } else {
            this.selectedPositionGeoCode = '';
          }
        }
      });

      google.maps.event.addListener(this.map, 'drag', (event) => {
        this.mark.setPosition(this.map.getCenter());
        this.selectedPosition = this.map.getCenter();

        let geocoder = new google.maps.Geocoder();
        let request = {
          latLng: this.selectedPosition,
        };
        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              this.selectedPositionGeoCode = results[0].formatted_address;
              this.selectedData = {
                position: this.selectedPosition,
                name: this.selectedPositionGeoCode,
              };
              this.selectedSearchOne = this.selectedPositionGeoCode;
            } else {
              this.selectedPositionGeoCode = '';
            }
          }
        });
      });
    } else {
      this.selectedPosition = null;
      this.selectedPositionGeoCode = '';
      this.mark.setMap(null);
    }

    //
  }

  //get img from assets
  getImg(img) {
    return 'assets/img/' + img;
  }

  addMarker(position, map) {
    // icon:'assets/img/p4.jpg' with size 30x30
    let icon = {
      scaledSize: new google.maps.Size(30, 30),
    };
    return new google.maps.Marker({
      position,
      map,
      label: {
        text: ' ',
        color: 'white',
        className: 'marker-sx marker-sx-1',
      },
    });
  }

  async ngOnInit() {
    // setTimeout(() => {
    //   this.step=2
    // }, 1000);
    this.presentingElement = document.querySelector('.ion-page');

    let position = await MyGeo.getCurrentPosition();
    this.position = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    this.geoCodePosition(position);

    console.log('step', this.step);
    
    this.step = 2;
    setTimeout(() => {
      this.showMap();
    }, 200);

    // if (this.loadmap) {
    //   setTimeout(() => {
    //     this.showMap();
    //   });
    //   this.loadmap = false;
    // }
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
          this.selectedPositionGeoCode = results[0].formatted_address;
          this.selectedData = {
            position: this.selectedPosition,
            name: this.selectedPositionGeoCode,
          };
          this.selectedSearchOne = this.selectedPositionGeoCode;
        } else {
          this.selectedPositionGeoCode = '';
        }
      }
    });
  }

  rating;
  starClick(value) {
    this.rating = value;
  }

  loading() {
    this.step = 1;
  }
  homemain() {
    this.step = 2;
  }
  confirmation() {
    this.step = 3;
  }
  searchevo() {
    this.step = 4;
    // settimeout
    setTimeout(() => {
      this.step = 5;
    }, 1000);
  }
  finishlocation() {
    this.step = 5;
  }
  evochat() {
    this.router.navigate(['/evochat']);
    this.modal3.dismiss();
  }
  step6() {
    this.step = 2;
    this.modal3.dismiss();
  }
  backstep1() {
    this.step = 1;
  }
}
