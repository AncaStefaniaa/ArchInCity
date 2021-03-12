import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiscoverPage } from "./discover.component";
import { DiscoverPageRoutingModule } from "./discover-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule, DiscoverPageRoutingModule],
  declarations: [DiscoverPage],
})
export class DiscoverModule {}
