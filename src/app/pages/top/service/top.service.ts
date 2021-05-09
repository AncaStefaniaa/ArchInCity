import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class TopService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  getTop() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    return this.httpClient.get("http://192.168.1.193:3000/get_images", {
      params: {
        userId: userData.userId,
      },
    });
  }
}
