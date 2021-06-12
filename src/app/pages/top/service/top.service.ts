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


    return this.httpClient.get("http://192.168.1.161:3000/shared_photos");
  }

  addLike(userId, photoId){
    let body = {
      userId: userId,
      photoId: photoId
    };
    
    return this.httpClient.post("http://192.168.1.161:3000/vote_photo", body);
  }
}
