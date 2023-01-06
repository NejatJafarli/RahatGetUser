import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvopromocodePageRoutingModule } from './evopromocode-routing.module';

import { EvopromocodePage } from './evopromocode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvopromocodePageRoutingModule
  ],
  declarations: [EvopromocodePage]
})
export class EvopromocodePageModule {}
