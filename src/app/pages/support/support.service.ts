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
    return this.httpClient.post("http://20.86.155.16:3333/send_feedback", body);
  }
}
