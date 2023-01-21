import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { RadarSearchComponent } from 'src/app/components/radar-search/radar-search.component';
import { EnteraddressComponent } from 'src/app/components/enteraddress/enteraddress.component';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderbgComponent
  ],
  declarations: [
    HomePage,
    MenuComponent,
    RadarSearchComponent,
    EnteraddressComponent
  ]
})
export class HomePageModule {}
