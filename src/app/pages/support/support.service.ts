import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  sendFeedback(formData) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let body = {
      userId: userData.userId,
      feedback: formData,
    };
    return this.httpClient.post(
      "http://192.168.1.161:3000/send_feedback",
      body
    );
  }
}
