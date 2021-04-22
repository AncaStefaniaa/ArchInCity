import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class SessionDetailService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  getAllImages() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    return this.httpClient.get("http://192.168.1.133:3000/get_images", {
      params: {
        userId: userData.userId,
      },
    });
  }

  deleteSession(sessionId) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let body = {
      userId: userData.userId,
      photoId: sessionId,
    };

    return this.httpClient.post("http://192.168.1.133:3000/delete_image", body);
  }

  addFavoriteSession(sessionId) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    let body = {
      userId: userData.userId,
      photoId: sessionId,
    };

    return this.httpClient.post(
      "http://192.168.1.133:3000/favorite_image",
      body
    );
  }
}
