import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscoverDetailsPage } from "./discover-details";
import { DiscoverDetailsPageRoutingModule } from "./discover-details-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule, DiscoverDetailsPageRoutingModule],
  declarations: [DiscoverDetailsPage],
})
export class DiscoverDetailsModule {}
