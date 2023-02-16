import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentmethodsPageRoutingModule } from './paymentmethods-routing.module';

import { PaymentmethodsPage } from './paymentmethods.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentmethodsPageRoutingModule,
    HeaderbgComponent,
    TranslateModule

  ],
  declarations: [
    PaymentmethodsPage,
  ]
})
export class PaymentmethodsPageModule {}
