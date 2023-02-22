import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoWifiPageRoutingModule } from './no-wifi-routing.module';

import { NoWifiPage } from './no-wifi.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    NoWifiPageRoutingModule,
  ],
  declarations: [NoWifiPage],
})
export class NoWifiPageModule {}
