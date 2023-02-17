import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/my-service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-myaddress',
  templateUrl: './myaddress.page.html',
  styleUrls: ['./myaddress.page.scss'],
})
export class MyaddressPage implements OnInit {
  @ViewChild('modal') modal: any;
  step: number = 1;
  addresses;
  selectedAddressJson = {
    id: 0,
    name: '',
    AddressName: '',
    lat: '',
    long: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private myService: MyService,
    private navCtrl: NavController,
    private apiService: ApiService,
    private local: StorageService
  ) {}

  async remove(id) {
    //remove from database WITH API  Backend
    let res = await this.apiService.removeLocation(id);

    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }
    if(this.myService.handleErrors(res)) return;
    this.myService.Toast(res['message']);
    this.addresses = this.addresses.filter((item) => item.id !== id);
  }

  addNewLocation() {
    this.nextStep2();
    this.crud = 'add';
  }
  User;
  navBack() {
    this.navCtrl.back();
  }
  async ngOnInit() {
    let jsn = await this.local.get('user');
    this.User = JSON.parse(jsn);

    let res = await this.apiService.getLocations();
    if(this.myService.handleErrors(res)) return;

    this.addresses = res['data'];
    
  }

  nextStep1() {
    this.step = 1;
  }
  nextStep2() {
    this.step = 2;
  }
  tempName = '';
  addressTextResults;
  addressPositions;
  crud = '';
  async nameClick(value) {
    if (
      this.selectedAddressJson.lat != '' &&
      this.selectedAddressJson.long != ''
    ) {
      if (this.crud == 'add') {
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        let cordinates =
          this.selectedAddressJson.lat + ',' + this.selectedAddressJson.long;
        let res = await this.apiService.addLocation(
          value,
          cordinates,
          this.selectedAddressJson.AddressName
        );
        if(this.myService.handleErrors(res)) return;

        this.myService.Toast(res['message']);

        this.selectedAddressJson.name = value;

        this.addresses.push(res['data']);

        this.selectedAddressJson.name = '';
        this.selectedAddressJson.AddressName = '';
        this.selectedAddressJson.lat = '';
        this.selectedAddressJson.long = '';
        this.modal.dismiss();
        this.tempName = '';

        this.nextStep1();
      } else if (this.crud == 'edit') {
        //edit address in database
        //edit address in database
        //edit address in database
        let cord =
          this.selectedAddressJson.lat + ',' + this.selectedAddressJson.long;
        let res = await this.apiService.updateLocation(
          this.selectedAddressJson.id,
          value,
          cord,
          this.selectedAddressJson.AddressName
        );
        
        if (!res['status']) return this.myService.Toast(res['message']);
        if(this.myService.handleErrors(res)) return;
        
        this.myService.Toast(res['message']);

        for (let i = 0; i < this.addresses.length; i++) {
          if (this.addresses[i].name == this.selectedAddressJson.name) {
            this.addresses[i].name = value;
            this.addresses[i].location_name =
              this.selectedAddressJson.AddressName;
            break;
          }
        }

        this.selectedAddressJson.name = '';
        this.selectedAddressJson.AddressName = '';
        this.selectedAddressJson.lat = '';
        this.selectedAddressJson.long = '';
        this.modal.dismiss();
        this.tempName = '';

        this.nextStep1();
      }
    } else {
      alert('Please select a valid address');
    }
  }
  editAddress(index) {
    console.log(index);
    
    this.selectedAddressJson.id = this.addresses[index].id;
    this.selectedAddressJson.AddressName = this.addresses[index].location_name;
    // this.selectedAddressJson.Cordinates =  {
    //   Lat: this.addresses[index].cordinates.split(',')[0],
    //   Lng: this.addresses[index].cordinates.split(',')[1],
    // };
    console.log(this.addresses[index]);
    
    this.selectedAddressJson.name = this.addresses[index].name;
    this.selectedAddressJson.long = this.addresses[index].long;
    this.selectedAddressJson.lat = this.addresses[index].lat;
    this.tempName = this.addresses[index].name;
    this.nextStep2();
    this.crud = 'edit';
  }
  resultClick(i) {
    this.selectedAddressJson.AddressName = this.addressTextResults[i];
    
    let lat = this.addressPositions[i].lat;
    let lng = this.addressPositions[i].lng;
    this.selectedAddressJson.lat = lat;
    this.selectedAddressJson.long = lng;
    console.log(this.selectedAddressJson);
    
  }
  async whereChange(value) {
    this.addressTextResults = [];
    this.addressPositions = [];

    if (value.length < 1) return;

    // let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0`;
    let res = await this.apiService.getTextSearch(value);
    console.log(res['results']);
    
    res['results'].forEach((element) => {
      this.addressTextResults.push(element['name']);
      this.addressPositions.push(element['geometry']['location']);
    });
  }

  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : (this.step = 1);
  }
}
