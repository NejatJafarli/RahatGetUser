import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyreservationPageRoutingModule } from './myreservation-routing.module';

import { MyreservationPage } from './myreservation.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyreservationPageRoutingModule,
    HeaderbgComponent
    
  ],
  declarations: [
    MyreservationPage,
  ]
})
export class MyreservationPageModule {}
