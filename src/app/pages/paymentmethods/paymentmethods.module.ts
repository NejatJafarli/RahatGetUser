import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentmethodsPageRoutingModule } from './paymentmethods-routing.module';

import { PaymentmethodsPage } from './paymentmethods.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentmethodsPageRoutingModule
  ],
  declarations: [
    PaymentmethodsPage,
    HeaderbgComponent
  ]
})
export class PaymentmethodsPageModule {}
