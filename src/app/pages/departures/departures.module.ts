import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeparturesPageRoutingModule } from './departures-routing.module';

import { DeparturesPage } from './departures.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeparturesPageRoutingModule
    ,HeaderbgComponent
    
  ],
  declarations: [
    DeparturesPage,
  ]
})
export class DeparturesPageModule {}
