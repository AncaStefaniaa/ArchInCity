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

  getUserPicture(userId) {
    return this.httpClient.get("http://20.86.155.16:3333/get_user_info", {
      params: {
        userId: userId,
      },
    });
  }

  changePassword(email) {
    return this.httpClient.post(
      "http://20.86.155.16:3333/reset_password",
      email
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

  updatePicture(imageData) {
    const date = new Date().valueOf();
    const imageName = date + ".jpeg";

    const imageBlob = this.dataURItoBlob(imageData);
    const imageFile = new File([imageBlob], imageName, {
      type: "image/jpeg",
    });

    console.log(JSON.parse(localStorage.getItem("userData")));
    const userData = JSON.parse(localStorage.getItem("userData"));

    let formData = new FormData();
    formData.append("file", imageBlob, imageName);
    formData.append("userId", userData.userId);
    console.log(formData);
    var options = { content: formData };
    return this.httpClient.post(
      "http://20.86.155.16:3333/change_photo",
      formData
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
      "http://20.86.155.16:3333/arch_recognition",
      formData
    );
  }
}
