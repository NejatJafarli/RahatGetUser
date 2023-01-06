import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcarPageRoutingModule } from './addcar-routing.module';

import { AddcarPage } from './addcar.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcarPageRoutingModule
  ],
  declarations: [
    AddcarPage,
    HeaderbgComponent
  ]
})
export class AddcarPageModule {}
