import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController, ToastController } from "@ionic/angular";

import { UserData } from "../../providers/user-data";
import { AccountService } from "./account.service";
import { ToastHelper } from "../../providers/toast-helper";
import { LoadingHelper } from "../../providers/loading-helper";

@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"],
})
export class AccountPage implements AfterViewInit {
  username: string;
  email: string;
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private toastController: ToastController,
    private accountService: AccountService,
    private toastHelper: ToastHelper,
    private loadingHelper: LoadingHelper
  ) {}

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log("Clicked to update picture");
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
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
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: "Please confirm your email",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            this.loadingHelper.presentLoading(300);
            this.accountService.changePassword(data).subscribe(
              (res) => {
                this.toastHelper.presentSuccessToast("Yey. A link has been!");
              },
              (err) => {
                this.toastHelper.presentErrorToast("Error");
              }
            );
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
    this.router.navigateByUrl("/support");
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 10000,
    });
    toast.present();
  }
}
