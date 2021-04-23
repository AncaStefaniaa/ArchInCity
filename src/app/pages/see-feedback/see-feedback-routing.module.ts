import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SeeFeedbackPage } from "./see-feedback.component";

const routes: Routes = [
  {
    path: "",
    component: SeeFeedbackPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeFeedbackPageRoutingModule {}
