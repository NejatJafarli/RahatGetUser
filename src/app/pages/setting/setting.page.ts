import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { MyService } from 'src/app/services/my-service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  imgURL;

  constructor(
    public myService: MyService,
    private router: Router,
    private translateConfigService: TranslateConfigService
  ) {}

  ngOnInit() {
    this.myService.getCurrentLang().then((res) => {
      this.SelectedLang = res;
    });
  }
  SelectedLang;
  selectLang() {
    this.translateConfigService.setLanguage(this.SelectedLang);
  }
  goToMyInfo() {
    this.router.navigate(['/myinfo']);
  }
  // getCamera() {
  //   this.camera
  //     .getPicture({
  //       sourceType: this.camera.PictureSourceType.CAMERA,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //     })
  //     .then((res) => {
  //       this.imgURL = res;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  // getgallery() {
  //   this.camera
  //     .getPicture({
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //     })
  //     .then((res) => {
  //       this.imgURL = 'data:image/jpeg;base64,' + res;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
}
