import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    HeaderbgComponent,
    TranslateModule

  ],
  declarations: [
    NotificationPage,
  ]
})
export class NotificationPageModule {}
