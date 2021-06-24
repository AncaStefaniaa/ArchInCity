import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { myBuildings } from './my-buildings';

const routes: Routes = [
  {
    path: '',
    component: myBuildings
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class myBuildingsRoutingModule { }
