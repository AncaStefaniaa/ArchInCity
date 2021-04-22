import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import {
  ActionSheetController,
  ToastController,
  Platform,
} from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
// import { PhotoService } from "../../services/photo.service";
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

import { LoadingController } from "@ionic/angular";
// import {
//   BackgroundGeolocation,
//   BackgroundGeolocationResponse,
//   BackgroundGeolocationConfig,
// } from "@ionic-native/background-geolocation/ngx";

import { architecturalStyles } from "./discover.columns";
import { UserData } from "../../providers/user-data";
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
  address: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public camera: Camera,
    public domSanitizer: DomSanitizer,
    private discoverService: DiscoverService,
    private file: File,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private platform: Platform,
    private filePath: FilePath,
    private geolocation: Geolocation,
    public loadingController: LoadingController // private backgroundGeolocation: BackgroundGeolocation
  ) {}

  ngOnInit() {
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

        this.discoverService
          .getAddress(this.currPhotoLatitude, this.currPhotoLongitude)
          .subscribe((res) => {
            console.log(res);
            this.address = this.buildAddress(res);
            console.log(this.address);
          });
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

  buildAddress(geolocationData) {
    if (
      !geolocationData ||
      !geolocationData.results ||
      !geolocationData.results.length
    ) {
      return "Unknown location";
    }

    let bestResult = geolocationData.results[0];
    let components = bestResult.address_components;

    let country = this.getComponentByType(components, "country");
    let city = this.getComponentByType(components, "locality");
    let street = this.getComponentByType(components, "route");

    return [street, city, country];
  }

  getComponentByType(data, type) {
    for (let el of data) {
      if (el.types.indexOf(type) !== -1) {
        return el.long_name;
      }
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 3000,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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
          this.presentLoading();
          this.buildingStyle = parseInt(res["arch"]);

          this.discoverService
            .sendImageUser(
              imageData,
              this.buildingStyle,
              this.currPhotoLatitude,
              this.currPhotoLongitude,
              this.address
            )
            .subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );

          setTimeout(() => {
            this.populateCurrentBuildingStyle();
          }, 3000);
        },
        (err) => {
          console.log(err);
          this.presentToast(err);
        }
      );
    });
  }

  populateCurrentBuildingStyle() {
    this.isScanned = true;

    this.currentArchName = architecturalStyles[this.buildingStyle].name;
    this.currentArchImage = architecturalStyles[this.buildingStyle].image;

    this.router.navigateByUrl(
      "/app/tabs/discover/discover-details/" +
        architecturalStyles[this.buildingStyle].id
    );
  }
}
