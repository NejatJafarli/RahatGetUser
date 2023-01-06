import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatrgPage } from './chatrg.page';

const routes: Routes = [
  {
    path: '',
    component: ChatrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatrgPageRoutingModule {}
