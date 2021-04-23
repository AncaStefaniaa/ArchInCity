import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class SeeFeedbackService {
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  getFeedback() {
    return this.httpClient.get("http://192.168.1.133:3000/get_feedback");
  }
}
