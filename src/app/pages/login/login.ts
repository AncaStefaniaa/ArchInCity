import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions, UserLogin } from "../../interfaces/user-options";

import { LogInService } from "./login.service";

import { ToastController, AlertController } from "@ionic/angular";

import { AccountService } from "../account/account.service";
import { ToastHelper } from "../../providers/toast-helper";
import { LoadingHelper } from "../../providers/loading-helper";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: UserLogin = { email: "", password: "" };
  submitted = false;
  email: string;

  constructor(
    public userData: UserData,
    public router: Router,
    private logInService: LogInService,
    private toastController: ToastController,
    private accountService: AccountService,
    private toastHelper: ToastHelper,
    private loadingHelper: LoadingHelper,
    public alertCtrl: AlertController
  ) {}

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

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.logInService.logInUser(this.login).subscribe(
        (res) => {
          this.presentSuccessToast("You have successfully logged in");
          this.userData.login(this.login.email);
          this.userData.saveToLocalStorage(this.login.email, res.result);
          this.router.navigateByUrl("/app/tabs/schedule");
        },
        (err) => {
          this.presentErrorToast(err.error);
        }
      );
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
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
}
