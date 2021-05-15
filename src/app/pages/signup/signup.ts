import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions } from "../../interfaces/user-options";

import { SignUpService } from "./signup.service";

import { ToastController } from "@ionic/angular";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupPage {
  signup: UserOptions = { username: "", password: "", email: "" };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private signUpService: SignUpService,
    private toastController: ToastController
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

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.signUpService.signUpUser(this.signup).subscribe(
        (res) => {
          console.log(res);
          this.presentSuccessToast("You have successfully signed in");
          this.userData.signup(this.signup.username);
          this.userData.saveToLocalStorage(this.signup.email, res.result);
          this.router.navigateByUrl("/app/tabs/discover");
        },
        (err) => {
          console.log(err);
          this.presentErrorToast(err.error);
        }
      );
    }
  }
}
