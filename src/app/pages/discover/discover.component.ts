import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import {
  ActionSheetController,
  ToastController,
  Platform,
} from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { PhotoService } from "../../services/photo.service";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { DiscoverService } from "./discover.service";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";

import {
  Geolocation,
  Geoposition,
  GeolocationOptions,
} from "@ionic-native/geolocation/ngx";

import {
  BackgroundGeolocation,
  BackgroundGeolocationResponse,
  BackgroundGeolocationConfig,
} from "@ionic-native/background-geolocation/ngx";

import { architecturalStyles } from "./discover.columns";

const STORAGE_KEY = "my_images";

interface Coordonates {
  lat: number;
  lng: number;
  center: boolean;
}

@Component({
  selector: "app-discover",
  templateUrl: "discover.component.html",
  styleUrls: ["./discover.component.scss"],
})
export class DiscoverPage implements OnInit {
  imgSrc: any;
  imageSrc: any;
  formData: any;
  images = [];
  currPhotoLatitude: number = 0;
  currPhotoLongitude: number = 0;
  coordonates: Coordonates;
  buildingStyle: any;
  isScanned: boolean = false;
  currentArchName: any;
  currentArchImage: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public photoService: PhotoService,
    public camera: Camera,
    public domSanitizer: DomSanitizer,
    private discoverService: DiscoverService,
    private file: File,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private platform: Platform,
    private filePath: FilePath,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation
  ) {}

  ngOnInit() {
    console.log(this.route);
    let options = {
      timeout: 10000,
      enableHighAccuracy: true,
    };
    this.geolocation
      .getCurrentPosition(options)
      .then((resp) => {
        this.currPhotoLatitude = resp.coords.latitude;
        this.currPhotoLongitude = resp.coords.longitude;
        const coordonates: Coordonates = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
          center: true,
        };
        localStorage.setItem("coordonates", JSON.stringify(coordonates));
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      // console.log(data.coords.latitude);
      // console.log(data.coords.longitude);
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetHeight: 500,
      targetWidth: 500,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.discoverService.findStyle(imageData).subscribe(
        (res) => {
          this.buildingStyle = parseInt(res["arch"]);
          console.log(parseInt(res["arch"]));
          console.log(this.buildingStyle);
          this.populateCurrentBuildingStyle();
        },
        (err) => {
          console.log(err);
          //   this.presentToast(err);
        }
      );
    });
  }

  populateCurrentBuildingStyle() {
    this.isScanned = true;
    console.log(architecturalStyles);
    console.log(architecturalStyles[this.buildingStyle]);
    this.currentArchName = architecturalStyles[this.buildingStyle].name;
    this.currentArchImage = architecturalStyles[this.buildingStyle].image;

    this.router.navigateByUrl(
      "/app/tabs/discover/discover-details/" +
        architecturalStyles[this.buildingStyle].id
    );
  }
}
