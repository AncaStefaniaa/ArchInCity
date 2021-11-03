import { Component } from "@angular/core";
import { architecturalStyles } from "../discover/discover.columns";
@Component({
  selector: "page-over-time",
  templateUrl: "over-time.html",
  styleUrls: ["./over-time.scss"],
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor() {}

  ionViewDidEnter() {
    this.speakers = architecturalStyles;
  }
}
