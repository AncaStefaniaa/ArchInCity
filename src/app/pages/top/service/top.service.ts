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
    return this.httpClient.get("http://20.86.155.16:3333/shared_photos");
  }

  addLike(userId, photoId) {
    let body = {
      userId: userId,
      photoId: photoId,
    };

    return this.httpClient.post("http://20.86.155.16:3333/vote_photo", body);
  }
}
