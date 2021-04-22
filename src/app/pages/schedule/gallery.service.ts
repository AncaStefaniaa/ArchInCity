import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  getAllImages() {
    console.log(JSON.parse(localStorage.getItem("userData")));
    const userData = JSON.parse(localStorage.getItem("userData"));

    // formData.append("userId", userData.userId);
    return this.httpClient.get("http://192.168.1.133:3000/get_images", {
      params: {
        userId: userData.userId,
      },
    });
  }
}
