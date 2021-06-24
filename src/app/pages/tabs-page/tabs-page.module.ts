import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs-page";
import { TabsPageRoutingModule } from "./tabs-page-routing.module";

import { AboutModule } from "../about/about.module";
import { MapModule } from "../map/map.module";
import { myBuildingsModule } from "../my-buildings/my-buildings.module";
import { SessionDetailModule } from "../session-detail/session-detail.module";
import { overTimeDetailModule } from "../over-time-detail/over-time-detail.module";
import { SpeakerListModule } from "../over-time/over-time.module";
import { DiscoverModule } from "../discover/discover.module";
import { DiscoverDetailsModule } from "../discover-details/discover-details.module";

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    myBuildingsModule,
    SessionDetailModule,
    overTimeDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule,
    DiscoverModule,
    DiscoverDetailsModule,
  ],
  declarations: [TabsPage],
})
export class TabsModule {}
