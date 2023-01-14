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
import { timeout } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @Input() modalinitialbreakpoint = 0.55;
  @ViewChild('modal') modal: IonModal;
  plate;
  make;
  modalOpen: boolean = true;
  breakpoint: number = 1;
  step: number = 1;
  globalContext: any = this;
  toggleDisplayForRezerv = false;

  rezervChange() {
    this.toggleDisplayForRezerv = !this.toggleDisplayForRezerv;
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
  SelectedText = 1;
  SavedLocationClick(i) {
    this.WhereText = this.myAddresses[i].location_name;
    this.WherePosition = {
      lat: this.myAddresses[i].cordinates.split(',')[0],
      lng: this.myAddresses[i].cordinates.split(',')[1],
    };
  }
  resultClick(value) {
    if (this.SelectedText == 2) {
      this.WhereText = value;
      this.WherePosition =
        this.WherePositions[this.WhereTextResults.indexOf(value)];
    } else if (this.SelectedText == 1) {
      this.positionGeocod = value;
      this.position = this.WherePositions[this.WhereTextResults.indexOf(value)];
      console.log(this.position);
    }
    this.WhereTextResults = [];
    this.WherePositions = [];
  }
  ConfirmLocations() {
    //check whereText is empty
    if (this.WhereText == '') {
      return;
    }
    //check wherePosition is empty
    if (this.WherePosition == undefined) {
      return;
    }
    //check positionGeocod is empty
    if (this.positionGeocod == undefined) {
      return;
    }
    if (this.position == null) {
      return;
    }

    this.modalCtrl.dismiss();
    this.setOpen(false);
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
  SelectedPayment = 1;

  CardValue;
  async ngOnInit() {
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
          } else {
            navigator['app'].exitApp();
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

  myAddresses;
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

  async ionViewDidEnter() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['stepid']) {
        this.step = parseInt(params['stepid']);
      } else {
        this.step = 1;
      }
    });

    let activeOrder = JSON.parse(localStorage.getItem('activeOrder'));
    if (activeOrder != null) {
      this.activeOrder = activeOrder;
      console.log(this.activeOrder);

      let res = await this.http
        .post(
          this.service.ApiLink + '/user/getInfoAyigRide',
          { rideId: this.activeOrder.RideId },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .toPromise();

      if (!res['status']) return this.service.Toast(res['message']);

      if (res['data']['status'] == 'Pending') {
        this.service.Toast('Surucu Axtarilir');
        activeOrder.OrderStatus = 'Pending';
        activeOrder.step = 3;
        localStorage.setItem('activeOrder', JSON.stringify(activeOrder));
        this.roter.navigate(['/home/' + activeOrder.step]);
        this.service.mySocket.on('OrderAccepted', async (AcceptedData) => {
          let ress = await this.http
            .post(
              this.service.ApiLink + '/user/getDriverInfo',
              {
                driverId: AcceptedData.DriverId,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              }
            )
            .toPromise();

          if (!ress['status']) return this.service.Toast(ress['message']);

          AcceptedData.Driver = ress['data'];
          AcceptedData.step = 6;
          this.service.Toast('Sifariş qəbul edildi');

          localStorage.setItem('activeOrder', JSON.stringify(AcceptedData));
          this.activeOrder = AcceptedData;
          this.step = 4;
          setTimeout(async () => {
            this.DriverFound = false;
            setTimeout(() => {
              this.DriverFound = true;
              this.step = 6;
            }, 2000);
          }, 1000);
        });

        return;
      } else if (res['data']['status'] == 'Accepted') {
        this.service.Toast('Surucu Tapildi');
        activeOrder.OrderStatus = 'Accepted';
        activeOrder.step = 6;
        activeOrder.DriverId = res['data']['AyigDriverId'];
        let ress = await this.http
          .post(
            this.service.ApiLink + '/user/getDriverInfo',
            {
              driverId: activeOrder.DriverId,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          .toPromise();
        if (!ress['status']) return this.service.Toast(ress['message']);
        activeOrder.Driver = ress['data'];
        localStorage.setItem('activeOrder', JSON.stringify(activeOrder));
        this.roter.navigate(['/home/' + activeOrder.step]);
        return;
      }
    }

    if (this.step == 1) {
      let res = await this.http
        .post(
          this.service.ApiLink + '/user/getLocations',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .toPromise();

      this.myAddresses = res['data'];
    }
  }
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
  async home3() {
    let pos = { lat: this.position.lat, lng: this.position.lng };
    //get current datetime 2023-01-01 17:17:17
    let date = new Date();
    let getCurrentDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();

    let res = await this.http
      .post(
        this.service.ApiLink + '/user/CreateRideAyig',
        {
          takeLocation: pos.lat + ',' + pos.lng,
          startLocationName: this.positionGeocod,
          startDate: getCurrentDate,
          endLocationName: this.WhereText,
          endLocation: this.WherePosition.lat + ',' + this.WherePosition.lng,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .toPromise();

    if (!res['status']) return this.service.Toast(res['message']);

    let RideId = res['RideId'];
    console.log(res);

    // RideId: data.RideId,
    // UserId: data.UserId,
    // OrderData: data.OrderData,
    this.step = 3;
    this.setOpen(false);
    let json = {
      RideId: RideId,
      UserId: 'user' + this.service.user.id,
      OrderData: {
        pos: pos,
        address: this.positionGeocod,
        wherePos: this.WherePosition,
        wherePosGeocod: this.WhereText,
        make: this.make,
        plate: this.plate,
        payment: this.SelectedPayment == 1 ? 'cash' : 'card',
        price: 10,
      },
      UserData: {
        fullname: this.service.user.fullname,
        phone: this.service.user.phone,
        photoUrl: this.service.user.photo,
      },
    };

    this.service.mySocket.emit('SendOrderToDriver', json);
    let json2 = {
      RideId: RideId,
      UserId: 'user' + this.service.user.id,
      OrderData: {
        pos: pos,
        address: this.positionGeocod,
        wherePos: this.WherePosition,
        wherePosGeocod: this.WhereText,
        make: this.make,
        plate: this.plate,
        payment: this.SelectedPayment == 1 ? 'cash' : 'card',
        price: 10,
      },
      step: 3,
    };
    localStorage.setItem('activeOrder', JSON.stringify(json2));
    this.activeOrder = json2;

    this.service.mySocket.on('OrderAccepted', async (AcceptedData) => {
      let ress = await this.http
        .post(
          this.service.ApiLink + '/user/getDriverInfo',
          {
            driverId: AcceptedData.DriverId,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .toPromise();

      if (!ress['status']) return this.service.Toast(ress['message']);

      AcceptedData.Driver = ress['data'];
      AcceptedData.step = 6;
      this.service.Toast('Sifariş qəbul edildi');

      localStorage.setItem('activeOrder', JSON.stringify(AcceptedData));
      this.activeOrder = AcceptedData;
      this.step = 4;
      setTimeout(async () => {
        this.DriverFound = false;
        setTimeout(() => {
          this.DriverFound = true;
          this.step = 6;
        }, 2000);
      }, 1000);

      // setTimeout(() => {
      //   this.DriverFound = false;
      //   setTimeout(() => {
      //     this.DriverFound= true;
      //     this.step = 6;
      //     this.roter.navigate(['/home/' + this.step]);
      //   }, 5000);
      // }, 2500);
    });
  }
  // async home3() {
  //   let pos = { lat: this.position.lat, lng: this.position.lng };

  //   if (!res['status']) return this.service.Toast('Sifariş yaradılmadı');
  //   this.step = 3;
  //   let json = {
  //     rideId: res['rideId'],
  //     pos,
  //     address: this.positionGeocod,
  //     wherePos: this.WherePosition,
  //     wherePosGeocod: this.WhereText,
  //     make: this.make,
  //     plate: this.plate,
  //     payment: this.SelectedPayment == 1 ? 'cash' : 'card',
  //     price: 10,
  //     fullname: JSON.parse(localStorage.getItem('user')).fullname,
  //     UserId: 'user' + JSON.parse(localStorage.getItem('user')).id,
  //   };
  //   this.service.mySocket.emit('sendOrder', json);
  //   localStorage.setItem(
  //     'activeOrder',
  //     JSON.stringify({ data: json, step: 3 })
  //   );
  //   console.log(JSON.parse(localStorage.getItem('activeOrder')));
  //   this.activeOrder = JSON.parse(localStorage.getItem('activeOrder'));
  //   console.log('sendOrder');
  //   this.service.mySocket.once('OrderAccepted', async (data) => {
  //     console.log('OrderAccepted', data);
  //     let ress = await this.http
  //       .post(
  //         this.service.ApiLink + '/user/getInfoAyigRide',
  //         {
  //           rideId: data.data.rideId,
  //         },
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + localStorage.getItem('token'),
  //           },
  //         }
  //       )
  //       .toPromise();

  //     if (!ress['status']) return this.service.Toast(ress['message']);
  //     //save localstorage active order
  //     let active = JSON.parse(localStorage.getItem('activeOrder'));
  //     active.OrderId = ress['data']['OrderId'];
  //     active.chatId = ress['data']['chatId'];
  //     active.Driver = {};
  //     active.Driver.id = ress['data']['AyigDriverId'];
  //     //this field coming from api
  //     let res = await this.http
  //       .post(
  //         this.service.ApiLink + '/user/getDriverInfo',
  //         { driverId: active.Driver.id },
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + localStorage.getItem('token'),
  //           },
  //         }
  //       )
  //       .toPromise();
  //     if (!res['status']) return this.service.Toast(res['message']);
  //     this.foundedDriverPhotoUrl = res['data']['photo'];
  //     this.FoundedDriverName = res['data']['fullname'];
  //     this.FoundedDriverPhone = res['data']['phone'];

  //     active.Driver.foundedDriverPhotoUrl = res['data']['photo'];
  //     active.Driver.FoundedDriverName = res['data']['fullname'];
  //     active.Driver.FoundedDriverPhone = res['data']['phone'];
  //     this.activeOrder = active;
  //     localStorage.setItem('activeOrder', JSON.stringify(active));
  //     //Send Driverid to mysql and get him photo and set
  //     this.step = 4;
  //     setTimeout(async () => {
  //       this.DriverFound = false;

  //       setTimeout(() => {
  //         this.DriverFound = true;
  //         this.step = 6;
  //         let active = JSON.parse(localStorage.getItem('activeOrder'));
  //         active.step = 6;
  //         this.activeOrder = active;
  //         localStorage.setItem('activeOrder', JSON.stringify(active));
  //       }, 2000);
  //     }, 1000);
  //   });
  // }
  activeOrder = JSON.parse(localStorage.getItem('activeOrder'));
  DriverFound = true;
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
