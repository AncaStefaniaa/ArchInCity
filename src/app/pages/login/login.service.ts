import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LogInService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  logInUser(formData) {
    this.httpClient
      .post<any>("http://192.168.1.132:3000/login", formData)
      .subscribe(
        (res) => console.log(res),
        (err) => {
          console.log(err);
          //   this.presentToast(err);
        }
      );
  }
}
