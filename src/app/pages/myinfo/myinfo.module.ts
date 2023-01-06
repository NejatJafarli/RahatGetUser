import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyinfoPageRoutingModule } from './myinfo-routing.module';

import { MyinfoPage } from './myinfo.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyinfoPageRoutingModule
  ],
  declarations: [
    MyinfoPage,
    HeaderbgComponent
  ]
})
export class MyinfoPageModule {}
