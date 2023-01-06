import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvomyinfoPageRoutingModule } from './evomyinfo-routing.module';

import { EvomyinfoPage } from './evomyinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvomyinfoPageRoutingModule
  ],
  declarations: [EvomyinfoPage]
})
export class EvomyinfoPageModule {}
