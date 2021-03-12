import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { PhotoService } from "../../services/photo.service";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-discover",
  templateUrl: "discover.component.html",
  styleUrls: ["./discover.component.scss"],
})
export class DiscoverPage {
  imgSrc: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public photoService: PhotoService,
    public camera: Camera,
    public domSanitizer: DomSanitizer
  ) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetHeight: 500,
      targetWidth: 500,
    };

    this.camera.getPicture(options).then((imageUri) => {
      this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(
        "data:image/jpeg;base64," + imageUri
      );
    });
  }
}
