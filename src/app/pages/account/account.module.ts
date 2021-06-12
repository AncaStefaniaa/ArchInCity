import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AccountPage } from "./account";
import { AccountPageRoutingModule } from "./account-routing.module";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountPageRoutingModule,
    ImageCropperModule,
  ],
  declarations: [AccountPage],
})
export class AccountModule {}
