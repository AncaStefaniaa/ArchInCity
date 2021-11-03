import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { FeedbackService } from "./support.service";
import { ToastHelper } from "../../providers/toast-helper";
import { LoadingHelper } from "../../providers/loading-helper";

@Component({
  selector: "page-support",
  templateUrl: "support.html",
  styleUrls: ["./support.scss"],
})
export class SupportPage {
  submitted = false;
  supportMessage: string;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public feedbackService: FeedbackService,
    private toastHelper: ToastHelper,
    private loadingHelper: LoadingHelper,
    private router: Router
  ) {}

  sendFeedback() {
    console.log(this.supportMessage);
    this.loadingHelper.presentLoading(100);
    let message = this.supportMessage;
    this.feedbackService.sendFeedback(message).subscribe(
      (res) => {
        console.log(res);
        this.toastHelper.presentSuccessToast("Thanks for your feedback!");
        setTimeout(() => {
          this.router.navigate(["./app/tabs/my-buildings"]);
        }, 1000);
      },
      (err) => {
        console.log(err);
        this.toastHelper.presentErrorToast("Error");
      }
    );
  }

  submit(){
    
  }
}
