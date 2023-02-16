import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransitionPageRoutingModule } from './transition-routing.module';

import { TransitionPage } from './transition.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransitionPageRoutingModule,
    TranslateModule
  ],
  declarations: [TransitionPage]
})
export class TransitionPageModule {}
