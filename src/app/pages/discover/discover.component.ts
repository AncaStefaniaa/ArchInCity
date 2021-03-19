import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Storage } from "@ionic/storage";
import { FilePath } from "@ionic-native/file-path/ngx";

const STORAGE_KEY = "my_images";
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

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public photoService: PhotoService,
    public camera: Camera,
    public domSanitizer: DomSanitizer,
    private discoverService: DiscoverService,
    private file: File,
    private webview: WebView,
    private sqlite: SQLite,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private storage: Storage,
    private platform: Platform,
    private filePath: FilePath
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then((images) => {
      console.log("*****");
      if (images) {
        console.log("3333");
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
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
      // this.imgData = this.domSanitizer.bypassSecurityTrustResourceUrl(
      //   "data:image/jpeg;base64," + imagePath
      // );

      // if (
      //   this.platform.is("android") &&
      //   sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      // ) {
      //   this.filePath.resolveNativePath(imagePath).then((filePath) => {
      //     let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
      //     let currentName = imagePath.substring(
      //       imagePath.lastIndexOf("/") + 1,
      //       imagePath.lastIndexOf("?")
      //     );
      //     // this.copyFileToLocalDir(
      //     //   correctPath,
      //     //   currentName,
      //     //   this.createFileName()
      //     // );
      //   });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
      //   console.log("currName = ", currentName);
      //   console.log("correctPath = ", correctPath);
      //   this.copyFileToLocalDir(
      //     correctPath,
      //     currentName,
      //     this.createFileName()
      //   );
      // }
      // const formData = new FormData();
      // formData.append("input", this.imgSrc);

      this.discoverService.findStyle(imageData);
    });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    console.log(newFileName);
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log("------------copyFileToLocalDir----------------");
    console.log(namePath);
    console.log(currentName);
    console.log(this.file.dataDirectory);
    console.log(newFileName);
    // let dataDirectory = "filesystem:file:///C:/temp/";

    this.file
      .resolveLocalFilesystemUrl(namePath + "/" + currentName)
      .then((entry) => {
        (<FileEntry>entry).file((file) => this.readFile(file));
      })
      .catch((err) => {
        console.log(err);
        this.presentToast("Error while reading file");
      });

    // this.file
    //   .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
    //   .then(
    //     (success) => {
    //       this.updateStoredImages(newFileName);
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.presentToast("Error while storing file.");
    //     }
    //   );
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type,
      });
      formData.append("file", imgBlob, file.name);
      console.log(formData);
    };

    reader.readAsArrayBuffer(file);
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then((images) => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath,
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
}
