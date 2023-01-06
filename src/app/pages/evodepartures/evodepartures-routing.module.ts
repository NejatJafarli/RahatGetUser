import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvodeparturesPage } from './evodepartures.page';

const routes: Routes = [
  {
    path: '',
    component: EvodeparturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvodeparturesPageRoutingModule {}
