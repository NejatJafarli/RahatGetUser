import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvopaymentmethodsPage } from './evopaymentmethods.page';

const routes: Routes = [
  {
    path: '',
    component: EvopaymentmethodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvopaymentmethodsPageRoutingModule {}
