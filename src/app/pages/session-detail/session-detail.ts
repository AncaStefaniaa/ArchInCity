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
import {
  ToastController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
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
  message: string;
  show: boolean = false;

  @ViewChild("mapCanvas", { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private sessionDetailService: SessionDetailService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    public alertCtrl: AlertController
  ) {}

  async ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;

    this.architecturalStyles = architecturalStyles;
    this.sessionDetailService.getAllImages().subscribe((res) => {
      const sessionId = this.route.snapshot.paramMap.get("sessionId");

      let build = res["result"][parseInt(sessionId)];

      this.session = build;
      this.isFavorite = build.favorite;
      this.constructMap();
    });
  }

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
    // this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    let mapData = [
      {
        center: true,
        lat: parseFloat(this.session.latitude),
        lng: parseFloat(this.session.longitude),
      },
    ];

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

    if (this.isFavorite) {
      this.isFavorite = false;
      this.sessionDetailService
        .toggleFavorite(imageId, this.isFavorite)
        .subscribe((res) => {
          console.log(res);
        });

      this.userProvider.removeFavorite(this.session.id);
    } else {
      this.isFavorite = true;
      this.sessionDetailService
        .toggleFavorite(imageId, this.isFavorite)
        .subscribe((res) => {
          console.log(res);
        });

      this.userProvider.addFavorite(this.session.id);
    }
  }

  shareSession() {
    console.log("Clicked share session");
    this.shareImage();
  }

  async shareImage() {
    const alert = await this.alertCtrl.create({
      header: " Please tell us something about your discover",
      buttons: [
        "Cancel",
        {
          text: "Share",
          handler: (data: any) => {
            this.sessionDetailService
              .shareImage(
                this.session.photo_id,
                this.session.url,
                this.session.style,
                data
              )
              .subscribe(
                (res) => {
                  this.succesShared();
                },
                (err) => {
                  this.presentErrorToast("Error");
                }
              );
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "message",
          value: this.message,
          placeholder: "message",
        },
      ],
    });
    await alert.present();
  }

  async succesShared() {
    const alert = await this.alertCtrl.create({
      header: "Your photo has been succesfully shared",
      buttons: [
        {
          text: "Go to voting page",
          handler: (data: any) => {
            console.log("hey");
            this.router.navigateByUrl("/top");
          },
        },
        "Stay here",
      ],
    });
    await alert.present();
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

  async presentSuccessShare(text) {
    const toast = await this.toastController.create({
      position: "bottom",
      duration: 120000,
      color: "success",
      cssClass: "toast-custom-class",
      buttons: [
        {
          side: "start",
          text: "Stay here",
          icon: "star",
          handler: () => {
            console.log("Star clicked");
          },
        },
        {
          side: "start",
          text: "Go to voting page",
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
