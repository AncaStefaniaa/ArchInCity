import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController, ToastController } from "@ionic/angular";

import { UserData } from "../../providers/user-data";
import { AccountService } from "./account.service";
import { ToastHelper } from "../../providers/toast-helper";
import { LoadingHelper } from "../../providers/loading-helper";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";

@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"],
})
export class AccountPage implements AfterViewInit {
  username: string;
  userId;
  email: string;
  accountPhoto: string = "../../../assets/img/user.png";

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private toastController: ToastController,
    private accountService: AccountService,
    private toastHelper: ToastHelper,
    private loadingHelper: LoadingHelper,
    public camera: Camera
  ) {}

  ngAfterViewInit() {
    this.getUsername();
    this.getUserPhoto();
  }

  getUserPhoto() {
    this.accountService.getUserPicture(this.userId).subscribe((res) => {
      if (res["result"].profile_photo) {
        this.accountPhoto = res["result"].profile_photo;
      }
    });
  }

  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: "Change Username",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          value: this.username,
          placeholder: "username",
        },
      ],
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });

    this.username = JSON.parse(localStorage.getItem("userData")).username;
    this.userId = JSON.parse(localStorage.getItem("userData")).userId;
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: "Please confirm your email",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            let validEmail = JSON.parse(
              localStorage.getItem("userData")
            ).username;
            if (validEmail == data) {
              this.loadingHelper.presentLoading(300);
              this.accountService.changePassword(data).subscribe(
                (res) => {
                  this.toastHelper.presentSuccessToast("Yey. A link has been!");
                },
                (err) => {
                  this.toastHelper.presentErrorToast("Error");
                }
              );
            } else {
              this.toastHelper.presentErrorToast("Email is not valid");
            }
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "email",
          value: this.email,
          placeholder: "email",
        },
      ],
    });
    await alert.present();
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl("/login");
  }

  support() {
    let isAdmin = JSON.parse(localStorage.getItem("userData")).isAdmin;
    if(isAdmin){
      this.router.navigateByUrl("/see-feedback");
    }else{
      this.router.navigateByUrl("/support");
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 10000,
    });
    toast.present();
  }

  updatePicture(sourceType: PictureSourceType) {
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
      console.log(imageData);
      this.accountService.updatePicture(imageData).subscribe((res) => {
        console.log(res);
        this.accountPhoto = res["result"];
      });
    });
  }
}
