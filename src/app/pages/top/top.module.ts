import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TopPage } from "./top.component";
import { TopPageRoutingModule } from "./top-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule, TopPageRoutingModule],
  declarations: [TopPage],
})
export class TopModule {}
