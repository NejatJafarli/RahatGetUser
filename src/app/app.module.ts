import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//http client
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
const config: SocketIoConfig = { url: 'https://io.rahatget.az', options: {} };

import {
  TranslateLoader,
  TranslatePipe,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateConfigService } from './services/translate-config.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicInputMaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    IonicStorageModule.forRoot({
      name: '__AyigDriver',
      driverOrder: [
        cordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    }),
  ],
  providers: [
  TranslateConfigService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    StorageService,
    AuthService,
    AuthGuardGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
