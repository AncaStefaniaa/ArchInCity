import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";
import { Platform } from "@ionic/angular";
import { DOCUMENT } from "@angular/common";

import { darkStyle } from "./map-dark-style";
import { GalleryService } from "../my-buildings/gallery.service";
import { architecturalStyles } from "../discover/discover.columns";

@Component({
  selector: "page-map",
  templateUrl: "map.html",
  styleUrls: ["./map.scss"],
})
export class MapPage implements AfterViewInit {
  @ViewChild("mapCanvas", { static: true }) mapElement: ElementRef;
  mapBuildings: any;
  architecturalStyles: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.architecturalStyles = architecturalStyles;
  }

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector("ion-app");
    let isDark = false;
    let style = [];
    if (appEl.classList.contains("dark-theme")) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      "AIzaSyDUi5qVkVuZo1yhMWgSMOubk4igV53Jsyc"
    );

    let map;
    this.galleryService.getAllImages().subscribe((res) => {
      this.mapBuildings = res["result"];
      this.constructMapData(this.mapBuildings);
      this.confData.getMap().subscribe((mapData: any) => {
        const mapEle = this.mapElement.nativeElement;

        map = new googleMaps.Map(mapEle, {
          center: this.mapBuildings.find((d: any) => d.center),
          zoom: 16,
          styles: style,
        });

        this.mapBuildings.forEach((markerData: any) => {

          const infoWindow = new googleMaps.InfoWindow({
            content: `<img width="120" height="100" src="${
              markerData.url
            }"><h5 style="text-align: center;">${
              architecturalStyles[markerData.style].name
            }</h5>`,
          });

          const marker = new googleMaps.Marker({
            position: markerData,
            map,
            title: markerData["style"],
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        });

        googleMaps.event.addListenerOnce(map, "idle", () => {
          mapEle.classList.add("show-map");
        });
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains("dark-theme");
          if (map && isDark) {
            map.setOptions({ styles: darkStyle });
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

  constructMapData(mapData) {
    mapData.forEach((element) => {
      element["center"] = true;
      element["lat"] = parseFloat(element["latitude"]);
      element["lng"] = parseFloat(element["longitude"]);
    });
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
