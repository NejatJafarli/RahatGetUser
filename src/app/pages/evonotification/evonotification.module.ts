import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvonotificationPageRoutingModule } from './evonotification-routing.module';

import { EvonotificationPage } from './evonotification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvonotificationPageRoutingModule
  ],
  declarations: [EvonotificationPage]
})
export class EvonotificationPageModule {}
