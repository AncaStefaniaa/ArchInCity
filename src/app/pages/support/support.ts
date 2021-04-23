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

  // async ionViewDidEnter() {
  //   const toast = await this.toastCtrl.create({
  //     message: "This does not actually send a support request.",
  //     duration: 3000,
  //   });
  //   await toast.present();
  // }

  // async submit(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.supportMessage = "";
  //     this.submitted = false;

  //     const toast = await this.toastCtrl.create({
  //       message: "Your support request has been sent.",
  //       duration: 3000,
  //     });
  //     await toast.present();
  //   }
  // }

  sendFeedback() {
    console.log(this.supportMessage);
    this.loadingHelper.presentLoading(100);
    let message = this.supportMessage;
    this.feedbackService.sendFeedback(message).subscribe(
      (res) => {
        console.log(res);
        this.toastHelper.presentSuccessToast("Thanks for your feedback!");
        setTimeout(() => {
          this.router.navigate(["./app/tabs/schedule"]);
        }, 1000);
      },
      (err) => {
        console.log(err);
        this.toastHelper.presentErrorToast("Error");
      }
    );
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  // async ionViewCanLeave(): Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
  //     return true;
  //   }

  //   return new Promise((resolve: any, reject: any) => {
  //     const alert = await this.alertCtrl.create({
  //       title: "Leave this page?",
  //       message:
  //         "Are you sure you want to leave this page? Your support message will not be submitted.",
  //       buttons: [
  //         { text: "Stay", handler: reject },
  //         { text: "Leave", role: "cancel", handler: resolve },
  //       ],
  //     });

  //     await alert.present();
  //   });
  // }
}
