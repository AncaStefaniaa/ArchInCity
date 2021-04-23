import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { ToastController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoadingHelper {
  favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";

  constructor(
    public storage: Storage,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  async presentLoading(time: number = 3000) {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: time,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
