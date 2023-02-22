import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Camera,
  Photo,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/my-service';
import { StorageService } from 'src/app/services/storage.service';
import { Directory } from '@capacitor/filesystem/dist/esm/definitions';
const IMAGE_DIR = 'stored_images';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.page.html',
  styleUrls: ['./myinfo.page.scss'],
})
export class MyinfoPage implements OnInit {
  step: number = 1;
  passwordType: string = 'password';
  passwordType1: string = 'password';
  passwordType2: string = 'password';
  passwordShow: boolean = false;
  passwordShow1: boolean = false;
  passwordShow2: boolean = false;

  User;

  public tooglePassword() {
    if (this.passwordShow) {
      this.passwordType = 'password';
      this.passwordShow = false;
    } else {
      this.passwordType = 'text';
      this.passwordShow = true;
    }
  }
  public tooglePassword1() {
    if (this.passwordShow1) {
      this.passwordType1 = 'password';
      this.passwordShow1 = false;
    } else {
      this.passwordType1 = 'text';
      this.passwordShow1 = true;
    }
  }
  public tooglePassword2() {
    if (this.passwordShow2) {
      this.passwordType2 = 'password';
      this.passwordShow2 = false;
    } else {
      this.passwordType2 = 'text';
      this.passwordShow2 = true;
    }
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private myService: MyService,
    private navCtrl: NavController,
    private apiService: ApiService,
    private local: StorageService,
    private platform: Platform
  ) {}
  navBack() {
    this.navCtrl.back();
  }
  async ngOnInit() {
    //deep copy
    this.User = JSON.parse(JSON.stringify(this.myService.user));
  }
  async selectImage1() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });
    console.log(image);
    if (image) {
      await this.saveImage(image);
      const readFile1 = await Filesystem.readFile({
        path: this.myPhoto.path,
        directory: Directory.Data,
      });
      console.log(readFile1);
      
      this.myPhoto.data = `data:image/jpeg;base64,${readFile1.data}`;
      this.imgData=this.myPhoto.data;
      this.User.photo = this.myPhoto.data;
      console.log(this.myPhoto);
    }
  }
  imgData;
  async SentImg() {
    const readFile1 = await Filesystem.readFile({
      path: this.myPhoto.path,
      directory: Directory.Data,
    });
    this.myPhoto.data = `data:image/jpeg;base64,${readFile1.data}`;
    const response1 = await fetch(this.myPhoto.data);
    const blob1 = await response1.blob();
    return blob1;
  }
  myPhoto={
    path: '',
    data: '',
    name: '',
  };

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      recursive: true,
    });

    this.myPhoto = {
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      name: fileName,
    };
    
    console.log('saved ', savedFileImage);
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async Save() {
    let blop = null;
    if (this.myPhoto.name.length > 0) {
      blop = await this.SentImg();
    }
    let res;
    if (blop == null) {
      res = await this.apiService.updateAccount(
        this.User.fullname,
        this.User.age
      );
    }
    else{
      res = await this.apiService.updateAccount(
        this.User.fullname,
        this.User.age,
        blop
      );
    }
    console.log(res);
    
    if(this.myService.handleErrors(res)) return;

    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }

    console.log(res);
    
    this.User = res['data'];
    this.User.photo='data:image/jpeg;base64,'+this.User.photo;
    this.myService.Toast(res['message']);
    this.User = res['data'];
    this.local.set('user', JSON.stringify(this.User));
    this.myService.user = this.User;
    this.router.navigate(['/home']);
  }
  OldPass;
  NewPass;
  ConfirmPass;
  profile1() {
    this.step = 1;
  }
  async SavePass() {
    if (this.OldPass == null) {
      this.myService.Toast('Please_enter_old_password');
      return;
    }
    if (this.NewPass != this.ConfirmPass) {
      this.myService.Toast('Password_not_match');
      return;
    }
    let res = await this.apiService.updatePassword(this.OldPass, this.NewPass);
    console.log(res);
    if(this.myService.handleErrors(res)) return;
    
    if (!res['status']) {
      this.myService.Toast(res['message']);
      return;
    }

    this.myService.Toast(res['message']);

    this.step = 1;
    this.OldPass = null;
    this.NewPass = null;
    this.ConfirmPass = null;
  }
  profile2() {
    this.step = 2;
  }
  backbtn() {
    this.step == 1 ? this.router.navigate(['/home']) : (this.step = 1);
  }
}
