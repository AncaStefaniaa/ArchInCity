import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DiscoverDetailsPage } from "./discover-details";

const routes: Routes = [
  {
    path: "",
    component: DiscoverDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverDetailsPageRoutingModule {}
