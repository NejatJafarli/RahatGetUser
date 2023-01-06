import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvohelpPageRoutingModule } from './evohelp-routing.module';

import { EvohelpPage } from './evohelp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvohelpPageRoutingModule
  ],
  declarations: [EvohelpPage]
})
export class EvohelpPageModule {}
