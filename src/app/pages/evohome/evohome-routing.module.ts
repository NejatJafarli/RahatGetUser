import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvohomePage } from './evohome.page';

const routes: Routes = [
  {
    path: '',
    component: EvohomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvohomePageRoutingModule {}
