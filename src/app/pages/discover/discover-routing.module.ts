import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DiscoverPage } from "./discover.component";

const routes: Routes = [
  {
    path: "",
    component: DiscoverPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}
