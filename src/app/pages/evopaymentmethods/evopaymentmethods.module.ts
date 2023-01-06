import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvopaymentmethodsPageRoutingModule } from './evopaymentmethods-routing.module';

import { EvopaymentmethodsPage } from './evopaymentmethods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvopaymentmethodsPageRoutingModule
  ],
  declarations: [EvopaymentmethodsPage]
})
export class EvopaymentmethodsPageModule {}
