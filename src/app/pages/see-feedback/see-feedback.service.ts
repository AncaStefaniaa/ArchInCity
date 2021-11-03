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
    return this.httpClient.get("http://20.86.155.16:3333/get_feedback");
  }
}
