import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SeeFeedbackPage } from "./see-feedback.component";
import { SeeFeedbackPageRoutingModule } from "./see-feedback-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule, SeeFeedbackPageRoutingModule],
  declarations: [SeeFeedbackPage],
})
export class SeeFeedbackModule {}
