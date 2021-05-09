import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TopPage } from "./top.component";
import { TopPageRoutingModule } from "./top-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule, TopPageRoutingModule, FormsModule],
  declarations: [TopPage],
})
export class TopModule {}
