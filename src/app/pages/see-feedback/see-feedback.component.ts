import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { SeeFeedbackService } from "./see-feedback.service";
@Component({
  selector: "app-see-feedback",
  templateUrl: "see-feedback.component.html",
  styleUrls: ["./see-feedback.component.scss"],
})
export class SeeFeedbackPage {
  data: any;
  dataArray: any = [];

  constructor(private seeFeedbackService: SeeFeedbackService) {}
  ngOnInit() {
    this.seeFeedbackService.getFeedback().subscribe((res) => {
      this.data = res["result"];

      Object.values(this.data).forEach((element) => {
        this.dataArray.push(element);
      });
      console.log(this.dataArray);
    });
  }
}
