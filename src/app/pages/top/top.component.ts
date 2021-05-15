import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { TopService } from "./service/top.service";
import { architecturalStyles } from "../discover/discover.columns";
import { ToastController } from "@ionic/angular";
@Component({
  selector: "app-top",
  templateUrl: "top.component.html",
  styleUrls: ["./top.component.scss"],
})
export class TopPage {
  data: any;
  segment = "recomended";
  architecturalStyles;

  dataArray: any;
  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -100,
  };

  constructor(
    private topService: TopService,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    this.architecturalStyles = architecturalStyles;
    this.topService.getTop().subscribe((res) => {
      this.dataArray = res["result"];
      this.dataArray.sort((a, b) =>
        a.voteUserIds.length < b.voteUserIds.length ? 1 : -1
      );
    });
  }

  updateSection() {
    console.log(this.segment);
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  getPhotoData(photoId) {
    return this.dataArray.find((p) => p.photoId === photoId);
  }

  addLike(photoId) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let userId = userData.userId;

    let photoData = this.getPhotoData(photoId);

    if (photoData.voteUserIds.includes(userId)) {
      this.presentToast("You already voted for this photo! :)");
      return;
    }

    this.topService.addLike(userId, photoId).subscribe((res) => {
      photoData.voteUserIds.push(userId);
      if (res["result"] === "true") {
        this.presentToast("Your vote has been processed. Thanks!");
      } else {
        this.presentToast(
          "There was an error in processing the vote. Please try again!"
        );
      }
    });

    return 0;
  }
}
