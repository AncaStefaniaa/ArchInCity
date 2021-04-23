import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { ToastController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class ToastHelper {
  favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";

  constructor(
    public storage: Storage,
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
}
