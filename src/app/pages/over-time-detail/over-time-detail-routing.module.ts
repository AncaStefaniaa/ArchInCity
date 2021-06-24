import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { overTimeDetailPage } from './over-time-detail';

const routes: Routes = [
  {
    path: '',
    component: overTimeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class overTimeDetailPageRoutingModule { }
