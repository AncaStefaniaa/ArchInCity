import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs-page";
import { myBuildings } from "../my-buildings/my-buildings";
import { SpeakerListPage } from "../over-time/over-time";
const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "over-time",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../over-time/over-time.module").then(
                (m) => m.SpeakerListModule
              ),
          },
          {
            path: "session/:sessionId",
            loadChildren: () =>
              import("../session-detail/session-detail.module").then(
                (m) => m.SessionDetailModule
              ),
          },
          {
            path: "over-time-details/:speakerId",
            loadChildren: () =>
              import("../over-time-detail/over-time-detail.module").then(
                (m) => m.overTimeDetailModule
              ),
          },
        ],
      },
      {
        path: "my-buildings",
        children: [
          {
            path: "",
            component: myBuildings,
          },
          {
            path: "session/:sessionId",
            loadChildren: () =>
              import("../session-detail/session-detail.module").then(
                (m) => m.SessionDetailModule
              ),
          },
        ],
      },
      {
        path: "discover",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../discover/discover.module").then(
                (m) => m.DiscoverModule
              ),
          },
          {
            path: "discover-details/:discoverId",
            loadChildren: () =>
              import("../discover-details/discover-details.module").then(
                (m) => m.DiscoverDetailsModule
              ),
          },
        ],
      },
      {
        path: "map",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../map/map.module").then((m) => m.MapModule),
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../about/about.module").then((m) => m.AboutModule),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/app/tabs/over-time",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
