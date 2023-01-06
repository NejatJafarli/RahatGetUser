import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvochatPageRoutingModule } from './evochat-routing.module';

import { EvochatPage } from './evochat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvochatPageRoutingModule
  ],
  declarations: [EvochatPage]
})
export class EvochatPageModule {}
