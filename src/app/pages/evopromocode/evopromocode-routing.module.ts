import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvopromocodePage } from './evopromocode.page';

const routes: Routes = [
  {
    path: '',
    component: EvopromocodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvopromocodePageRoutingModule {}
