import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvohelpPage } from './evohelp.page';

const routes: Routes = [
  {
    path: '',
    component: EvohelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvohelpPageRoutingModule {}
