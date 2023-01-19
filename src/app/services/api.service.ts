import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _token;
  constructor(private http: HttpClient, private local: StorageService) {
    this.init();
  }
  init() {
    this._token = this.local.getToken();
  }
  async login(json) {
    //convert to promise
    return await new Promise((resolve, reject) => {
      this.http
        .post(environment.ApiLink + '/driver/login', {
          phone: '+994' + json.loginPhone,
          password: json.loginPassword,
        })
        .subscribe((data) => {
          this.local.setToken(data['token']);
          resolve(data);
        });
    });
  }

  async logout() {
    return await new Promise((resolve, reject) => {
      this.http
        .get(environment.ApiLink + '/user/logout', {
          headers: {
            Authorization: 'Bearer ' + this._token,
          },
        })
        .subscribe((data) => {
          this._token = null;
          resolve(data);
        });
    });
  }
  async checkToken() {
    return await new Promise((resolve, reject) => {
      this.http
        .get(environment.ApiLink + '/user/checktoken', {
          headers: {
            Authorization: 'Bearer ' + this.local.getToken(),
          },
        })
        .subscribe((data) => {
          if (data['message'] == 'success') this.local.setToken(data['token']);
          resolve(data);
        });
    });
  }

  async getInfoAyigRide(RideId) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/getInfoAyigRide',
          { rideId: RideId },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  async getDriverInfo(RideID) {
    let cache = await this.local.getCachedRequests(
      environment.ApiLink + '/user/getDriverInfo'
    );
    if (cache != null) {
      return cache;
    } else {
      let data = new Promise((resolve, reject) => {
        this.http
          .post(
            environment.ApiLink + '/user/getDriverInfo',
            { rideId: RideID },
            {
              headers: {
                Authorization: 'Bearer ' + this._token,
              },
            }
          )
          .subscribe((data) => {
            resolve(data);
          });
      });
      this.local.cacheRequests(
        environment.ApiLink + '/user/getDriverInfo',
        data
      );
      return data;
    }
  }

  async getLocations() {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/getLocations',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.local.getToken(),
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
      // , (error) => {
      //   reject(error);
      // }
    });
  }

  async cancelRideAyig(RideId) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/cancelRideAyig',
          { rideId: RideId },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async CreateRideAyig(json) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.ApiLink + '/user/CreateRideAyig', json, {
          headers: {
            Authorization: 'Bearer ' + this._token,
          },
        })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async removeLocation(id) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/removeLocation',
          { id: id },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async updateAccount(fullname, phone, age) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/updateAccount',
          {
            fullname: fullname,
            phone: phone,
            age: age,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async updatePassword(oldPassword, newPassword) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/updatePassword',
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async addLocation(name, cordinates, location_name) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/addLocation',
          {
            name: name,
            cordinates: cordinates,
            location_name: location_name,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  async updateLocation(id, name, cordinates, location_name) {
    return await new Promise((resolve, reject) => {
      this.http
        .post(
          environment.ApiLink + '/user/updateLocation',
          {
            id: id,
            name: name,
            cordinates: cordinates,
            location_name: location_name,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this._token,
            },
          }
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}