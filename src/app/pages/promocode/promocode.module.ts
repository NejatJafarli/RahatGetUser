import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocodePageRoutingModule } from './promocode-routing.module';

import { PromocodePage } from './promocode.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocodePageRoutingModule,
    HeaderbgComponent

  ],
  declarations: [
    PromocodePage,
  ]
})
export class PromocodePageModule {}
