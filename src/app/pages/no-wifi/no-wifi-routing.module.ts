import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoWifiPage } from './no-wifi.page';

const routes: Routes = [
  {
    path: '',
    component: NoWifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoWifiPageRoutingModule {}
