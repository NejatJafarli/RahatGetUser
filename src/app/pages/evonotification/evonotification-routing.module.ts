import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvonotificationPage } from './evonotification.page';

const routes: Routes = [
  {
    path: '',
    component: EvonotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvonotificationPageRoutingModule {}
