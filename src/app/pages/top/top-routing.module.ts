import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TopPage } from "./top.component";

const routes: Routes = [
  {
    path: "",
    component: TopPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopPageRoutingModule {}
