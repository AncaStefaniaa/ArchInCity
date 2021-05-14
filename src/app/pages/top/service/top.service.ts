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


    return this.httpClient.get("http://192.168.1.193:3000/shared_photos");
  }

  addLike(photoId){
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    let body = {
      userId: userData.userId,
      photoId: photoId
    };
        console.log(body);
    return this.httpClient.post("http://192.168.1.193:3000/vote_photo", body);
  }
}
