import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { environment } from 'src/environments/environment';
const IMAGE_DIR = 'stored_images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient,) { }


  async uploadImage(image: string) {
    const formData = new FormData();
    formData.append('image', image);
    return await new Promise((resolve, reject) => {
      this.http
        .post(environment.ApiLink + '/user/uploadImage', formData)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            resolve(error);
          }
        );
    });
  }

  async loadImageFromDevice(path) {
    //file read as base64
    const readFile1 = await Filesystem.readFile({
      path: path,
      directory: Directory.Data,
    });
  }
  async saveImageToDirectory(base64Data: string) {
    let filename = new Date().getTime() + '.jpeg';
    let path = IMAGE_DIR + '/' + filename;
    const savedFileImage = await Filesystem.writeFile({
      directory: Directory.Data,
      path: path,
      data: base64Data,
      recursive: true,
    });
    return path;
  }
    

  async downloadImage(url: string) {
    return await new Promise((resolve, reject) => {
      const imageBlob = this.http.get(url, { responseType: 'blob' }).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }
    

  async convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

}
