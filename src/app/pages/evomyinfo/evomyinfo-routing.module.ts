import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvomyinfoPage } from './evomyinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EvomyinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvomyinfoPageRoutingModule {}
