import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  AfterViewInit,
} from "@angular/core";

import { ConferenceData } from "../../providers/conference-data";
import { ActivatedRoute, Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { myBuildings } from "../schedule/gallery.columns";
import { SessionDetailService } from "./session-detail.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { architecturalStyles } from "../discover/discover.columns";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "page-session-detail",
  styleUrls: ["./session-detail.scss"],
  templateUrl: "session-detail.html",
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = "";
  architecturalStyles: any;
  @ViewChild("mapCanvas", { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private sessionDetailService: SessionDetailService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;

    this.architecturalStyles = architecturalStyles;
    this.sessionDetailService.getAllImages().subscribe((res) => {
      console.log(res["result"]);
      const sessionId = this.route.snapshot.paramMap.get("sessionId");
      for (const build of res["result"]) {
        if (build && build.id == sessionId) {
          console.log(build);
          this.session = build;
          console.log(this.session.id);
          this.isFavorite = this.userProvider.hasFavorite(this.session.id);
          this.constructMap();
          break;
        }
      }
    });

    // this.dataProvider.load().subscribe((data: any) => {
    //   console.log(data);
    //   if (
    //     data &&
    //     data.schedule &&
    //     data.schedule[0] &&
    //     data.schedule[0].groups
    //   ) {
    //     const sessionId = this.route.snapshot.paramMap.get("sessionId");
    //     for (const group of data.schedule[0].groups) {
    //       if (group && group.sessions) {
    //         for (const session of group.sessions) {
    //           if (session && session.id === sessionId) {
    //             this.session = session;
    //             this.isFavorite = this.userProvider.hasFavorite(
    //               this.session.name
    //             );
    //             break;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
  }

  // ionViewDidEnter() {

  // }
  async constructMap() {
    const appEl = this.doc.querySelector("ion-app");
    let isDark = false;
    let style = [];
    // if (appEl.classList.contains("dark-theme")) {
    //   style = darkStyle;
    // }

    const googleMaps = await getGoogleMaps(
      "AIzaSyDUi5qVkVuZo1yhMWgSMOubk4igV53Jsyc"
    );

    let map;
    console.log("hey");
    console.log(this.mapElement);
    // this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    let mapData = [
      {
        center: true,
        lat: parseFloat(this.session.latitude),
        lng: parseFloat(this.session.longitude),
      },
    ];
    console.log(mapData);

    map = new googleMaps.Map(mapEle, {
      center: mapData.find((d: any) => d.center),
      zoom: 16,
      styles: style,
    });

    mapData.forEach((markerData: any) => {
      const infoWindow = new googleMaps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`,
      });
      const marker = new googleMaps.Marker({
        position: markerData,
        map,
        title: markerData.name,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    googleMaps.event.addListenerOnce(map, "idle", () => {
      mapEle.classList.add("show-map");
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains("dark-theme");
          if (map && isDark) {
            // map.setOptions({ styles: darkStyle });
          } else if (map) {
            map.setOptions({ styles: [] });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true,
    });
  }

  async ngAfterViewInit() {
    // this.constructMap();
  }

  sessionClick(item: string) {
    console.log("Clicked", item);
  }

  toggleFavorite() {
    let imageId = this.session.photo_id;
    // this.sessionDetailService.addFavoriteSession(imageId).subscribe((res) => {
    //   this.presentSuccessToast("Favorite successful");
    //   console.log("Favorite successful");
    // });
    console.log(this.session);
    if (this.userProvider.hasFavorite(this.session.id)) {
      this.userProvider.removeFavorite(this.session.id);
      this.isFavorite = false;
      this.sessionDetailService
        .toggleFavorite(imageId, this.isFavorite)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.userProvider.addFavorite(this.session.id);
      this.isFavorite = true;
      this.sessionDetailService
        .toggleFavorite(imageId, this.isFavorite)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  shareSession() {
    console.log("Clicked share session");
  }

  deleteSession() {
    let imageId = this.session.photo_id;
    this.presentLoading();
    setTimeout(() => {
      this.sessionDetailService.deleteSession(imageId).subscribe(
        (res) => {
          this.presentSuccessToast("Delete successful");
          console.log("Delete successful");
          setTimeout(() => {
            this.router.navigate(["./app/tabs/schedule"]);
          }, 1000);
        },
        (err) => {
          this.presentErrorToast("Failed to delete image");
        }
      );
    }, 1000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Deleting...",
      duration: 1000,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentErrorToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
      color: "danger",
      buttons: [
        {
          side: "start",
          icon: "bug",
          handler: () => {
            console.log("Bug clicked");
          },
        },
      ],
    });
    toast.present();
  }

  async presentSuccessToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
      color: "success",
      buttons: [
        {
          side: "start",
          icon: "star",
          handler: () => {
            console.log("Star clicked");
          },
        },
      ],
    });
    toast.present();
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject("google maps not available");
      }
    };
  });
}
