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
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HttpClient } from '@angular/common/http';
import { MyService } from 'src/app/services/my-service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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
  RezervDate;
  RezervTime;
  constructor(
    private roter: Router,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private service: MyService,
    private apiService: ApiService,
    private local: StorageService,
    private platform: Platform
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
      lat: this.myAddresses[i].lat,
      lng: this.myAddresses[i].long,
    };
  }
  // ngondestroy
  ngOnDestroy() {
    // OrderAccepted
    // DriverLocationChanged
    // WaitingCustomer
    // OrderStarted
    // OrderCompletedConfirm

    if (this.service.hasListeners('OrderAccepted'))
      this.service.mySocket.removeAllListeners('OrderAccepted');
    if (this.service.hasListeners('DriverLocationChanged'))
      this.service.mySocket.removeAllListeners('DriverLocationChanged');
    if (this.service.hasListeners('WaitingCustomer'))
      this.service.mySocket.removeAllListeners('WaitingCustomer');
    if (this.service.hasListeners('OrderStarted'))
      this.service.mySocket.removeAllListeners('OrderStarted');
    if (this.service.hasListeners('OrderCompletedConfirm'))
      this.service.mySocket.removeAllListeners('OrderCompletedConfirm');

    if (this.service.platforumResume) {
      this.service.platforumResume = false;
      if (this.platforumResumeObj != null)
        this.platforumResumeObj.unsubscribe();
    }
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
  OnWay = 'Yolda';
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
  async whereChange(value) {
    if (this.currentLocation) {
      this.currentLocation = false;
      return;
    }
    // trim value
    if (value.trim() == '') return;

    this.WhereTextResults = [];
    this.WherePositions = [];

    let res = await this.apiService.getTextSearch(value);

    // console.log(data);
    res['results'].forEach((element) => {
      this.WhereTextResults.push(element['name']);
      this.WherePositions.push(element['geometry']['location']);
    });
  }
  currentLocation = true;
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
  platforumResumeObj;
  async ngOnInit() {
    this.activeOrder = JSON.parse(await this.local.get('activeOrder'));
    this.CardValue = await this.service.getTranslate('home_pay_with_card');

    // this.RezervDate
    // this.RezervTime  get current date and time UTC +4
    let date = new Date();
    date.setHours(date.getHours() + 4);
    this.RezervDate = date.toISOString();
    this.RezervTime = date.toISOString();

    console.log(this.RezervDate);
    console.log(this.RezervTime);

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
    console.log('check permission for location');

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

    //when platform resume
    if (this.service.platforumResume == false) {
      this.service.platforumResume = true;
      this.platforumResumeObj = this.platform.resume.subscribe(async () => {
        //get activeRezevr
        let activeRezerv = JSON.parse(await this.local.get('activeRezerv'));
        let activeOrder = JSON.parse(await this.local.get('activeOrder'));

        if (activeRezerv != null && activeOrder == null) {
          //check ExpireDate
          let date = new Date();
          let expireDate = new Date(activeRezerv.ExpireDate);
          console.log('---------------------');
          console.log(date);
          console.log(expireDate);
          console.log('---------------------');

          console.log(date > expireDate);

          if (date > expireDate) {
            await this.local.remove('activeRezerv');
            console.log('activeRezerv ExpireDate');
            //remove activeRezerv add it activeOrder and go to step 3
            activeRezerv.step = 3;
            await this.local.set('activeOrder', JSON.stringify(activeRezerv));
            activeOrder = activeRezerv;
          }
        }
        console.log(activeOrder);
        if (activeOrder != null) {
          this.activeOrder = activeOrder;

          this.SelectedPayment = this.activeOrder.OrderData.payment == 'cash' ? 1 : 2;
          let res = await this.apiService.getInfoAyigRide(
            this.activeOrder.RideId
          );

          if (!res['status']) return this.service.Toast(res['message']);
          if (this.service.handleErrors(res)) return;

          if (res['data']['status'] == 'Pending') {
            this.service.Toast('toast_we_are_searching_for_a_driver');
            activeOrder.OrderStatus = 'Pending';
            activeOrder.step = 3;
            this.local.set('activeOrder', JSON.stringify(activeOrder));
            // this.roter.navigate(['/home/' + activeOrder.step]);
            this.step = activeOrder.step;
            if (!this.service.hasListeners('OrderAccepted')) {
              this.service.mySocket.on(
                'OrderAccepted',
                async (AcceptedData) => {
                  let ress = await this.apiService.getDriverInfo(
                    AcceptedData.DriverId
                  );

                  if (!ress['status'])
                    return this.service.Toast(ress['message']);
                  if (this.service.handleErrors(ress)) return;

                  AcceptedData.Driver = ress['data'];
                  AcceptedData.step = 6;
                  this.service.Toast('toast_your_order_is_accepted');

                  this.local.set('activeOrder', JSON.stringify(AcceptedData));
                  this.activeOrder = AcceptedData;
                  this.step = 4;
                  setTimeout(async () => {
                    this.DriverFound = false;
                    setTimeout(() => {
                      this.DriverFound = true;
                      this.step = 6;
                    }, 2000);
                  }, 1000);
                }
              );
            }

            return;
          } else if (res['data']['status'] == 'Accepted') {
            activeOrder.OrderStatus = 'Accepted';
            activeOrder.step = 6;
            activeOrder.DriverId = 'driver' + res['data']['AyigDriverId'];
            activeOrder.OrderId = res['data']['OrderId'];
            let ress = await this.apiService.getDriverInfo(
              res['data']['AyigDriverId']
            );
            console.log(ress);
            if (!ress['status']) return this.service.Toast(ress['message']);
            if (this.service.handleErrors(ress)) return;
            activeOrder.Driver = ress['data'];
            this.local.set('activeOrder', JSON.stringify(activeOrder));
            this.activeOrder = activeOrder;

            if (!this.service.hasListeners('DriverLocationChanged')) {
              this.service.mySocket.on('DriverLocationChanged', (data) => {
                this.activeOrder.RemainingTime = data.RemainingTime;
                this.local.set('activeOrder', JSON.stringify(this.activeOrder));
              });
            }
            if (!this.service.hasListeners('WaitingCustomer')) {
              this.service.mySocket.once('WaitingCustomer', async (data) => {
                console.log('WaitingCustomer', data);

                if (data.OrderId != this.activeOrder.OrderId) return;
                this.OnWay = 'waiting you';

                this.activeOrder.OrderStatus = 'Waiting Customer';
                this.activeOrder.RemainingTime = data.RemainingTime;

                console.log('listening for OrderStarted');
                if (!this.service.hasListeners('OrderStarted')) {
                  this.service.mySocket.once('OrderStarted', async (data) => {
                    this.OnWay = 'Yolda';
                    this.activeOrder.OrderStatus = 'Started';
                    this.activeOrder.RemainingTime = data.RemainingTime;
                    this.local.set(
                      'activeOrder',
                      JSON.stringify(this.activeOrder)
                    );
                    if (!this.service.hasListeners('OrderCompletedConfirm')) {
                      this.service.mySocket.once(
                        'OrderCompletedConfirm',
                        async (data) => {
                          this.activeOrder.OrderStatus = 'Completed';
                          this.activeOrder.step = 7;
                          let DriverRes = await this.apiService.getDriverInfo(
                            this.activeOrder.DriverId
                          );
                          if (this.service.handleErrors(DriverRes)) return;
                          this.activeOrder.Driver = DriverRes['data'];
                          this.local.set(
                            'activeOrder',
                            JSON.stringify(this.activeOrder)
                          );
                          this.step = activeOrder.step;
                          // this.roter.navigate(['/home/' + activeOrder.step]);
                        }
                      );
                    }
                  });
                }
                this.local.set('activeOrder', JSON.stringify(this.activeOrder));
                // this.roter.navigate(['/home/' + activeOrder.step]);
                this.step = activeOrder.step;
              });
            }
            // this.roter.navigate(['/home/' + activeOrder.step]);
            this.step = activeOrder.step;
            return;
          } else if (res['data']['status'] == 'Waiting Customer') {
            activeOrder.OrderStatus = 'Waiting Customer';
            this.OnWay = 'waiting you';
            activeOrder.step = 6;
            activeOrder.DriverId = 'driver' + res['data']['AyigDriverId'];
            activeOrder.OrderId = res['data']['OrderId'];
            let ress = await this.apiService.getDriverInfo(
              res['data']['AyigDriverId']
            );
            if (!ress['status']) return this.service.Toast(ress['message']);
            if (this.service.handleErrors(ress)) return;
            if (!this.service.hasListeners('OrderStarted')) {
              this.service.mySocket.once('OrderStarted', async (data) => {
                this.OnWay = 'Yolda';
                this.activeOrder.OrderStatus = 'Started';
                this.activeOrder.RemainingTime = data.RemainingTime;
                this.local.set('activeOrder', JSON.stringify(this.activeOrder));
              });
            }
            activeOrder.Driver = ress['data'];
            this.local.set('activeOrder', JSON.stringify(activeOrder));
            this.activeOrder = activeOrder;
            // this.roter.navigate(['/home/' + activeOrder.step]);
            this.step = activeOrder.step;
            if (!this.service.hasListeners('OrderCompletedConfirm')) {
              this.service.mySocket.once(
                'OrderCompletedConfirm',
                async (data) => {
                  this.activeOrder.OrderStatus = 'Completed';
                  this.activeOrder.step = 7;
                  this.local.set(
                    'activeOrder',
                    JSON.stringify(this.activeOrder)
                  );
                  this.step = 7;
                  // this.roter.navigate(['/home/' + activeOrder.step]);
                }
              );
            }
          } else if (res['data']['status'] == 'Started') {
            this.OnWay = 'Yolda';
            this.activeOrder.OrderStatus = 'Started';
            this.activeOrder.RemainingTime = 0;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            this.step = activeOrder.step;
            // this.roter.navigate(['/home/' + activeOrder.step]);
            if (!this.service.hasListeners('OrderCompletedConfirm')) {
              this.service.mySocket.once(
                'OrderCompletedConfirm',
                async (data) => {
                  this.activeOrder.OrderStatus = 'Completed';
                  this.activeOrder.step = 7;
                  this.local.set(
                    'activeOrder',
                    JSON.stringify(this.activeOrder)
                  );
                  this.step = 7;
                  // this.roter.navigate(['/home/' + activeOrder.step]);
                }
              );
            }
            //finished
          } else if (res['data']['status'] == 'Completed') {
            this.activeOrder.OrderStatus = 'Completed';
            this.activeOrder.step = 7;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            this.step = 7;
            // this.roter.navigate(['/home/' + activeOrder.step]);
          } else if (res['data']['status'] == 'rezerv') {
            //remove active order
            this.local.remove('activeOrder');
            this.service.Toast(
              'toast_your__reservation_has_been_canceled_because_we_could_not_find_a_driver'
            );
            this.activeOrder = null;
            this.step = 1;
            // this.roter.navigate(['/home/' + this.step]);
          }
        }
      });
    }

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
    //get activeRezevr
    let activeRezerv = JSON.parse(await this.local.get('activeRezerv'));
    let activeOrder = JSON.parse(await this.local.get('activeOrder'));

    if (activeRezerv != null && activeOrder == null) {
      //check ExpireDate
      let date = new Date();
      let expireDate = new Date(activeRezerv.ExpireDate);
      console.log('---------------------');
      console.log(date);
      console.log(expireDate);
      console.log('---------------------');

      console.log(date > expireDate);

      if (date > expireDate) {
        await this.local.remove('activeRezerv');
        console.log('activeRezerv ExpireDate');
        //remove activeRezerv add it activeOrder and go to step 3
        activeRezerv.step = 3;
        await this.local.set('activeOrder', JSON.stringify(activeRezerv));
        activeOrder = activeRezerv;
      }
    }
    console.log(activeOrder);
    if (activeOrder != null) {
      this.activeOrder = activeOrder;
      console.log(this.activeOrder);
      
      this.SelectedPayment = this.activeOrder.OrderData.payment == 'cash' ? 1 : 2;
      let res = await this.apiService.getInfoAyigRide(this.activeOrder.RideId);

      if (!res['status']) return this.service.Toast(res['message']);

      if (this.service.handleErrors(res)) return;
      if (res['data']['status'] == 'Pending') {
        this.service.Toast('toast_we_are_searching_for_a_driver');
        activeOrder.OrderStatus = 'Pending';
        activeOrder.step = 3;
        this.local.set('activeOrder', JSON.stringify(activeOrder));
        // this.roter.navigate(['/home/' + activeOrder.step]);
        this.step = activeOrder.step;
        if (!this.service.hasListeners('OrderAccepted')) {
          this.service.mySocket.on('OrderAccepted', async (AcceptedData) => {
            let ress = await this.apiService.getDriverInfo(
              AcceptedData.DriverId
            );

            if (!ress['status']) return this.service.Toast(ress['message']);

            if (this.service.handleErrors(ress)) return;

            AcceptedData.Driver = ress['data'];
            AcceptedData.step = 6;
            this.service.Toast('toast_your_order_is_accepted');
            this.local.set('activeOrder', JSON.stringify(AcceptedData));
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
        }
        return;
      } else if (res['data']['status'] == 'Accepted') {
        activeOrder.OrderStatus = 'Accepted';
        activeOrder.step = 6;
        activeOrder.DriverId = 'driver' + res['data']['AyigDriverId'];
        activeOrder.OrderId = res['data']['OrderId'];
        let ress = await this.apiService.getDriverInfo(
          res['data']['AyigDriverId']
        );
        console.log(ress);
        if (!ress['status']) return this.service.Toast(ress['message']);
        if (this.service.handleErrors(ress)) return;
        activeOrder.Driver = ress['data'];
        this.local.set('activeOrder', JSON.stringify(activeOrder));
        this.activeOrder = activeOrder;
        if (!this.service.hasListeners('DriverLocationChanged')) {
          this.service.mySocket.on('DriverLocationChanged', (data) => {
            this.activeOrder.RemainingTime = data.RemainingTime;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
          });
        }
        if (!this.service.hasListeners('WaitingCustomer')) {
          this.service.mySocket.once('WaitingCustomer', async (data) => {
            console.log('WaitingCustomer', data);

            if (data.OrderId != this.activeOrder.OrderId) return;
            this.OnWay = 'waiting you';

            this.activeOrder.OrderStatus = 'Waiting Customer';
            this.activeOrder.RemainingTime = data.RemainingTime;

            console.log('listening for OrderStarted');
            if (!this.service.hasListeners('OrderStarted')) {
              this.service.mySocket.once('OrderStarted', async (data) => {
                this.OnWay = 'Yolda';
                this.activeOrder.OrderStatus = 'Started';
                this.activeOrder.RemainingTime = data.RemainingTime;
                this.local.set('activeOrder', JSON.stringify(this.activeOrder));
                if (!this.service.hasListeners('OrderCompletedConfirm')) {
                  this.service.mySocket.once(
                    'OrderCompletedConfirm',
                    async (data) => {
                      this.activeOrder.OrderStatus = 'Completed';
                      this.activeOrder.step = 7;
                      let DriverRes = await this.apiService.getDriverInfo(
                        this.activeOrder.DriverId
                      );
                      if (this.service.handleErrors(DriverRes)) return;
                      this.activeOrder.Driver = DriverRes['data'];
                      this.local.set(
                        'activeOrder',
                        JSON.stringify(this.activeOrder)
                      );
                      this.step = activeOrder.step;
                      // this.roter.navigate(['/home/' + activeOrder.step]);
                    }
                  );
                }
              });
            }
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            // this.roter.navigate(['/home/' + activeOrder.step]);
            this.step = activeOrder.step;
          });
        }
        // this.roter.navigate(['/home/' + activeOrder.step]);
        this.step = activeOrder.step;
        return;
      } else if (res['data']['status'] == 'Waiting Customer') {
        activeOrder.OrderStatus = 'Waiting Customer';
        this.OnWay = 'waiting you';
        activeOrder.step = 6;
        activeOrder.DriverId = 'driver' + res['data']['AyigDriverId'];
        activeOrder.OrderId = res['data']['OrderId'];
        let ress = await this.apiService.getDriverInfo(
          res['data']['AyigDriverId']
        );
        if (!ress['status']) return this.service.Toast(ress['message']);
        if (this.service.handleErrors(ress)) return;
        if (!this.service.hasListeners('OrderStarted')) {
          this.service.mySocket.once('OrderStarted', async (data) => {
            this.OnWay = 'Yolda';
            this.activeOrder.OrderStatus = 'Started';
            this.activeOrder.RemainingTime = data.RemainingTime;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
          });
        }
        activeOrder.Driver = ress['data'];
        this.local.set('activeOrder', JSON.stringify(activeOrder));
        this.activeOrder = activeOrder;
        // this.roter.navigate(['/home/' + activeOrder.step]);
        this.step = activeOrder.step;
        if (!this.service.hasListeners('OrderCompletedConfirm')) {
          this.service.mySocket.once('OrderCompletedConfirm', async (data) => {
            this.activeOrder.OrderStatus = 'Completed';
            this.activeOrder.step = 7;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            this.step = 7;
            // this.roter.navigate(['/home/' + activeOrder.step]);
          });
        }
      } else if (res['data']['status'] == 'Started') {
        this.OnWay = 'Yolda';
        this.activeOrder.OrderStatus = 'Started';
        this.activeOrder.RemainingTime = 0;
        this.local.set('activeOrder', JSON.stringify(this.activeOrder));
        // this.roter.navigate(['/home/' + activeOrder.step]);
        this.step = activeOrder.step;
        if (!this.service.hasListeners('OrderCompletedConfirm')) {
          this.service.mySocket.once('OrderCompletedConfirm', async (data) => {
            this.activeOrder.OrderStatus = 'Completed';
            this.activeOrder.step = 7;
            this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            this.step = 7;
            // this.roter.navigate(['/home/' + activeOrder.step]);
          });
        }
        //finished
      } else if (res['data']['status'] == 'Completed') {
        this.activeOrder.OrderStatus = 'Completed';
        this.activeOrder.step = 7;
        this.local.set('activeOrder', JSON.stringify(this.activeOrder));
        this.step = 7;
        // this.roter.navigate(['/home/' + activeOrder.step]);
      } else if (res['data']['status'] == 'rezerv') {
        //remove active order
        this.local.remove('activeOrder');
        this.service.Toast(
          'toast_your__reservation_has_been_canceled_because_we_could_not_find_a_driver'
        );
        this.activeOrder = null;
        this.step = 1;
        // this.roter.navigate(['/home/' + this.step]);
      }
    }
    if (this.step == 1) {
      let res = await this.apiService.getLocations();
      if (this.service.handleErrors(res)) return;
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

  async home1() {
    let res = await this.apiService.cancelRideAyig(this.activeOrder.RideId);
    if (!res['status']) return this.service.Toast(res['message']);
    if (this.service.handleErrors(res)) return;
    this.service.Toast('toast_your_order_has_been_canceled');
    this.service.mySocket.emit('CancelOrder', this.activeOrder);
    this.local.remove('activeOrder');
    this.OnWay = 'Yolda';
    console.log(this.OnWay);

    res = await this.apiService.getLocations();

    if (this.service.handleErrors(res)) return;
    this.myAddresses = res['data'];
    this.step = 1;
    this.activeOrder = null;

    // this.roter.navigate(['/home/1']);
  }
  home2() {
    this.step = 2;
    // this.modalCtrl.dismiss();
  }
  HomeThreeDisable = false;
  async home3() {
    if (this.toggleDisplayForRezerv == true) {
      //check if user has active rezerv in local storage
      let activeRezerv = await this.local.get('activeRezerv');
      if (activeRezerv)
        return this.service.Toast('toast_you_have_an_active_reservation');
      //check if user has active rezerv in server
      let res = await this.apiService.checkActiveRezerv();

      if (res['status']) return this.service.Toast(res['message']);
      if (this.service.handleErrors(res)) return;
      //create rezerv
      let pos = { lat: this.position.lat, lng: this.position.lng };
      this.HomeThreeDisable = true;

      // this.RezervDate year month day
      let MyRezervDate = new Date(this.RezervDate);
      let MyRezervTime = new Date(this.RezervTime);
      // set my rezerv time  +4 hours
      MyRezervTime.setHours(MyRezervTime.getHours() + 4);
      //merge date and time to one date
      MyRezervDate.setHours(MyRezervTime.getHours());
      MyRezervDate.setMinutes(MyRezervTime.getMinutes());

      //check if rezertrealdate is less than current date
      let currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + 30);
      if (MyRezervDate < currentDate)
        return this.service.Toast(
          'toast_your_reservation_date_and_time_must_be_at_least_30_minutes_later'
        );

      let RezervIsoString = MyRezervDate.toISOString();
      // 2023-02-14T06:47:51.039Z => 2023-02-14T06:47
      RezervIsoString = RezervIsoString.slice(0, 16);
      res = await this.apiService.createRezerv({
        takeLocation: pos.lat + ',' + pos.lng,
        startLocationName: this.positionGeocod,
        startDate: RezervIsoString,
        endLocationName: this.WhereText,
        endLocation: this.WherePosition.lat + ',' + this.WherePosition.lng,
      });
      console.log(res);

      if (!res['status']) return this.service.Toast(res['message']);
      if (this.service.handleErrors(res)) return;

      this.toggleDisplayForRezerv = false;
      this.HomeThreeDisable = true;
      this.service.Toast(
        'toast_your_reservation_has_been_created_successfully_and_It_will_be_show_In_my_reservations_page'
      );
      // let MyRezervDate = new Date(getCurrentDate);
      MyRezervDate.setMinutes(MyRezervDate.getMinutes() - 30);

      let expireDate = MyRezervDate.toISOString();
      expireDate = expireDate.slice(0, 16);

      let json = {
        RideId: res['RideId'],
        UserId: 'user' + this.service.user.id,
        OrderId: null,
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
        step: 1,
        ExpireDate: expireDate,
      };
      console.log(json);
      await this.local.set('activeRezerv', JSON.stringify(json));

      let OrderId = this.service.myGuid();
      let json2 = {
        RideId: res['RideId'],
        UserId: 'user' + this.service.user.id,
        OrderId: OrderId,
        OrderData: {
          pos: pos,
          address: this.positionGeocod,
          wherePos: this.WherePosition,
          wherePosGeocod: this.WhereText,
          make: this.make,
          plate: this.plate,
          payment: this.SelectedPayment == 1 ? 'cash' : 'card',
          price: 10,
          StartDate: RezervIsoString,
        },
        // UserData: {
        //   fullname: this.service.user.fullname,
        //   phone: this.service.user.phone,
        //   photoUrl: this.service.user.photo,
        // },
      };
      this.service.mySocket.emit('CreateRezervOrder', json2);
      let resFromApi = await this.apiService.updateRezerv(
        res['RideId'],
        OrderId
      );
      console.log(resFromApi);

      if (!resFromApi['status'])
        return this.service.Toast(resFromApi['message']);
      if (this.service.handleErrors(resFromApi)) return;
      let rezerv = JSON.parse(await this.local.get('activeRezerv'));
      console.log(rezerv);
      rezerv.OrderId = OrderId;
      await this.local.set('activeRezerv', JSON.stringify(rezerv));
      //return step 1
      this.step = 1;
      // this.roter.navigate(['/home/1']);
    } else {
      let pos = { lat: this.position.lat, lng: this.position.lng };
      this.HomeThreeDisable = true;
      //get current datetime 2023-01-01 17:17:17
      let date = new Date();
      date.setHours(date.getHours() + 4);
      let getCurrentDate = date.toISOString();
      console.log(getCurrentDate);
      // 2023-02-14T06:47:51.039Z => 2023-02-14T06:47
      getCurrentDate = getCurrentDate.slice(0, 16);

      let res = await this.apiService.CreateRideAyig({
        takeLocation: pos.lat + ',' + pos.lng,
        startLocationName: this.positionGeocod,
        startDate: getCurrentDate,
        endLocationName: this.WhereText,
        endLocation: this.WherePosition.lat + ',' + this.WherePosition.lng,
        make: this.make,
        plate: this.plate,
        payment_method: this.SelectedPayment == 1 ? 'cash' : 'card',
      });

      if (!res['status']) return this.service.Toast(res['message']);
      if (this.service.handleErrors(res)) return;
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
          price: 4,
        },
        // UserData: {
        //   fullname: this.service.user.fullname,
        //   phone: this.service.user.phone,
        //   photoUrl: this.service.user.photo,
        // },
      };

      this.service.mySocket.emit('SendOrderToDriver', json);
      console.log('send order to driver');

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
          price: 4,
        },
        step: 3,
      };
      this.local.set('activeOrder', JSON.stringify(json2));
      this.HomeThreeDisable = false;
      this.activeOrder = json2;
      if (!this.service.hasListeners('OrderAccepted')) {
        this.service.mySocket.on('OrderAccepted', async (AcceptedData) => {
          let ress = await this.apiService.getDriverInfo(AcceptedData.DriverId);

          if (!ress['status']) return this.service.Toast(ress['message']);
          if (this.service.handleErrors(ress)) return;
          if (!this.service.hasListeners('WaitingCustomer')) {
            this.service.mySocket.once('WaitingCustomer', async (data) => {
              console.log('WaitingCustomer', data);

              if (data.OrderId != this.activeOrder.OrderId) return;
              this.OnWay = 'waiting you';

              this.activeOrder.OrderStatus = 'Waiting Customer';
              this.activeOrder.RemainingTime = data.RemainingTime;

              console.log('listening for OrderStarted');
              if (!this.service.hasListeners('OrderStarted')) {
                this.service.mySocket.once('OrderStarted', async (data) => {
                  this.OnWay = 'Yolda';
                  this.activeOrder.OrderStatus = 'Started';
                  this.activeOrder.RemainingTime = data.RemainingTime;
                  this.local.set(
                    'activeOrder',
                    JSON.stringify(this.activeOrder)
                  );
                  if (!this.service.hasListeners('OrderCompletedConfirm')) {
                    this.service.mySocket.once(
                      'OrderCompletedConfirm',
                      async (data) => {
                        this.activeOrder.OrderStatus = 'Completed';
                        this.activeOrder.step = 7;
                        this.local.set(
                          'activeOrder',
                          JSON.stringify(this.activeOrder)
                        );
                        this.step = 7;
                      }
                    );
                  }
                });
              }
              this.local.set('activeOrder', JSON.stringify(this.activeOrder));
            });
          }
          AcceptedData.Driver = ress['data'];
          AcceptedData.step = 6;
          this.service.Toast('toast_your_order_is_accepted');

          this.local.set('activeOrder', JSON.stringify(AcceptedData));
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
    }
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
  activeOrder;
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
  comment;
  disableReytingButton = false;
  async home8() {
    this.disableReytingButton = true;
    let res = await this.apiService.sendReytingToDriver(
      this.activeOrder.Driver.id,
      this.rating,
      this.comment
    );
    console.log(res);

    this.disableReytingButton = false;
    if (this.service.handleErrors(res)) return;
    if (!res['status']) return this.service.Toast(res['message']);
    this.step = 8;
    // save rating and comment to mysql
    this.local.remove('activeOrder');
    setTimeout(async () => {
      this.step = 1;
      let res = await this.apiService.getLocations();
      if (this.service.handleErrors(res)) return;

      this.myAddresses = res['data'];
      // this.roter.navigate(['/home/1']);
    }, 2000);
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
