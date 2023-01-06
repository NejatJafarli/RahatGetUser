import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupCallsPageRoutingModule } from './pickup-calls-routing.module';

import { PickupCallsPage } from './pickup-calls.page';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';
import { RadarSearchComponent } from 'src/app/components/radar-search/radar-search.component';
import { OtpcodeComponent } from 'src/app/components/otpcode/otpcode.component';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';
import { EnteraddressComponent } from 'src/app/components/enteraddress/enteraddress.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
// ionscroll


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupCallsPageRoutingModule,
  ],
  declarations: [
    PickupCallsPage,
    PickupCallCardComponent,
    RadarSearchComponent,
    HeaderbgComponent,
    EnteraddressComponent,
    MenuComponent,
  ]
})
export class PickupCallsPageModule {
}
