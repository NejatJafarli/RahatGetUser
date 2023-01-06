import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatrgPageRoutingModule } from './chatrg-routing.module';

import { ChatrgPage } from './chatrg.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatrgPageRoutingModule
  ],
  declarations: [
    ChatrgPage,
    HeaderbgComponent
  ]
})
export class ChatrgPageModule {}
