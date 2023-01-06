import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvochatPage } from './evochat.page';

const routes: Routes = [
  {
    path: '',
    component: EvochatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvochatPageRoutingModule {}
