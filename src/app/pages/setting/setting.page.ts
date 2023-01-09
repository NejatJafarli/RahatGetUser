import { Component, OnInit } from '@angular/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { MyService } from 'src/app/envoriment/my-service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  imgURL;

  constructor(private camera: Camera, public myService: MyService) {}

  ngOnInit() {}

  getCamera() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI,
      })
      .then((res) => {
        this.imgURL = res;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getgallery() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
      })
      .then((res) => {
        this.imgURL = 'data:image/jpeg;base64,' + res;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
