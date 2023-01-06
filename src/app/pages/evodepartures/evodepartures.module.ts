import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvodeparturesPageRoutingModule } from './evodepartures-routing.module';

import { EvodeparturesPage } from './evodepartures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvodeparturesPageRoutingModule
  ],
  declarations: [EvodeparturesPage]
})
export class EvodeparturesPageModule {}
