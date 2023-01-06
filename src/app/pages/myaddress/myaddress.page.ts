import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/envoriment/my-service';

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
    Cordinates: {},
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private myService: MyService
  ) {}

  async remove(id) {
    //remove from database WITH API  Backend
    let res = await this.http
      .post(
        this.myService.ApiLink + '/user/removeLocation',
        { id: id },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .toPromise();

    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }
    this.myService.Toast(res['message']);
    this.addresses = this.addresses.filter((item) => item.id !== id);
  }

  addNewLocation() {
    this.nextStep2();
    this.crud = 'add';
  }
  User;
  async ngOnInit() {
    let jsn = localStorage.getItem('user');
    this.User = JSON.parse(jsn);

    let res = await this.http
      .post(
        this.myService.ApiLink + '/user/getLocations',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .toPromise();

    console.log(res);

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
    console.log(this.selectedAddressJson.Cordinates);

    if (this.selectedAddressJson.Cordinates != '') {
      if (this.crud == 'add') {
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        //SEND API REQUEST TO APPEND NEW ADDRESS TO DATABASE
        let res = await this.http
          .post(
            this.myService.ApiLink + '/user/addLocation',
            {
              name: value,
              cordinates:
                this.selectedAddressJson.Cordinates['lat'] +
                ',' +
                this.selectedAddressJson.Cordinates['lng'],
              location_name: this.selectedAddressJson.AddressName,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          .toPromise();

        this.myService.Toast(res['message']);

        this.selectedAddressJson.name = value;

        //get last id from address list
        let lastId = this.addresses[this.addresses.length - 1].id;
        this.addresses.push({
          id: lastId + 1,
          name: this.selectedAddressJson.name,
          location_name: this.selectedAddressJson.AddressName,
        });

        this.selectedAddressJson.name = '';
        this.selectedAddressJson.AddressName = '';
        this.selectedAddressJson.Cordinates = '';
        this.modal.dismiss();
        this.tempName = '';

        this.nextStep1();
      } else if (this.crud == 'edit') {
        console.log(this.selectedAddressJson);

        //edit address in database
        //edit address in database
        //edit address in database

        let res = await this.http
          .post(
            this.myService.ApiLink + '/user/updateLocation',
            {
              id: this.selectedAddressJson.id,
              name: value,
              cordinates:
                this.selectedAddressJson.Cordinates['lat'] +
                ',' +
                this.selectedAddressJson.Cordinates['lng'],
              location_name: this.selectedAddressJson.AddressName,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          .toPromise();
        if (!res['status']) return this.myService.Toast(res['message']);

        this.myService.Toast(res['message']);

        console.log(this.selectedAddressJson);

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
        this.selectedAddressJson.Cordinates = '';
        this.modal.dismiss();
        this.tempName = '';

        this.nextStep1();
      }
    } else {
      alert('Please select a valid address');
    }
  }
  editAddress(index) {
    this.selectedAddressJson.id = this.addresses[index].id;
    this.selectedAddressJson.AddressName = this.addresses[index].location_name;
    // this.selectedAddressJson.Cordinates =  {
    //   Lat: this.addresses[index].cordinates.split(',')[0],
    //   Lng: this.addresses[index].cordinates.split(',')[1],
    // };
    this.selectedAddressJson.name = this.addresses[index].name;
    this.tempName = this.addresses[index].name;
    this.nextStep2();
    this.crud = 'edit';
  }
  resultClick(i) {
    this.selectedAddressJson.AddressName = this.addressTextResults[i];
    this.selectedAddressJson.Cordinates = this.addressPositions[i];
  }
  whereChange(value) {
    this.addressTextResults = [];
    this.addressPositions = [];

    // let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0`;
    let url =
      '/places?query=' +
      encodeURI(value) +
      '&key=AIzaSyBMqRoKxM1TmwA7PTM8sbWzrcCD5VQLSP0';

    this.http.get(url).subscribe((data) => {
      // console.log(data);
      data['results'].forEach((element) => {
        this.addressTextResults.push(element['name']);
        this.addressPositions.push(element['geometry']['location']);
      });
    });
  }

  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : (this.step = 1);
  }
}
