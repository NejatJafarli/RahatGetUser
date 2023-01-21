import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//http client
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

//import socket.io-client
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { Drivers } from '@ionic/storage';
import { AuthService } from './services/auth.service';
import { AuthGuardGuard } from './auth-guard.guard';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__AyigDriver',
      driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    StorageService,
    AuthService,
    AuthGuardGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
