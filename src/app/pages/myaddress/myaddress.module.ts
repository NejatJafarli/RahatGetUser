import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaddressPageRoutingModule } from './myaddress-routing.module';

import { MyaddressPage } from './myaddress.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaddressPageRoutingModule,
  ],
  declarations: [
    MyaddressPage,
    HeaderbgComponent
  ]
})
export class MyaddressPageModule {}
