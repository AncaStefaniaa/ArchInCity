import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  url: any;
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  changePassword(email) {
    return this.httpClient.post(
      "http://192.168.1.133:3000/reset_password",
      email
    );
  }
  findStyle(imageData) {
    const date = new Date().valueOf();
    const imageName = date + ".jpeg";

    const imageBlob = this.dataURItoBlob(imageData);
    const imageFile = new File([imageBlob], imageName, { type: "image/jpeg" });

    let formData = new FormData();
    formData.append("file", imageBlob, imageName);

    var options = { content: formData };

    return this.httpClient.post<any>(
      "http://192.168.1.133:3000/arch_recognition",
      formData
    );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: "image/jpeg" });

    return blob;
  }
}
