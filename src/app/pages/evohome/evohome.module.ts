import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvohomePageRoutingModule } from './evohome-routing.module';

import { EvohomePage } from './evohome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvohomePageRoutingModule
  ],
  declarations: [EvohomePage]
})
export class EvohomePageModule {}
