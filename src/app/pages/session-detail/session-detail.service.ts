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

    return this.httpClient.get("http://192.168.1.161:3000/get_images", {
      params: {
        userId: userData ? userData.userId : 0,
      },
    });
  }

  deleteSession(sessionId) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let body = {
      userId: userData.userId,
      photoId: sessionId,
    };

    return this.httpClient.post("http://192.168.1.161:3000/delete_image", body);
  }

  toggleFavorite(sessionId, isFavorite) {
    let body = {
      isFavorite: isFavorite,
      photoId: sessionId,
    };

    return this.httpClient.post(
      "http://192.168.1.161:3000/favorite_status",
      body
    );
  }

  shareImage(sessionId, url, style, message) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let body = {
      userId: userData.userId,
      photoId: sessionId,
      message: message.message,
      archStyle: style,
      photoUrl: url,
    };

    return this.httpClient.post("http://192.168.1.161:3000/share_photo", body);
  }
}
